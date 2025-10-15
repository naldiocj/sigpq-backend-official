import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import puppeteer from "puppeteer";
import ejs from "ejs";

const path = require("path");
const { baseUrlFile } = require('./Configuracao-Base')

// Definindo a interface para os parâmetros da função gerarPDF
interface GerarPdfOptions {
  response: HttpContextContract['response'];
  pathModule: string;
  header?: string;
  footer?: string;
  typePaper?: 'A5' | 'A4' | 'A3' | 'Letter' | 'Legal';
}

// Interface para os parâmetros da função readPDF
interface ReadPdfOptions {
  response: HttpContextContract['response'];
  baseUrlFileTemplate: string;
  locationTemplate: string;
  nameFileTemplate: string;
  data: Record<string, any>; // Pode ajustar o tipo conforme necessário
}

// Função consumida só no backend para tornar a rota em pdf
export async function gerarPdf({
  response,
  pathModule,
  header,
  footer,
  typePaper = 'A4',
}: GerarPdfOptions): Promise<void> {

  const browser = await puppeteer.launch();

  try {

    const page = await browser.newPage();

    // Configurar a URL do Documento do Modulo que Será Renderizada com EJS
    //const url = process.env.DOCUMENTO_PDF + `${pathModule}`;
    const protocolo = process.env.PROTOCOLO || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '3333';
    const url = `${protocolo}://${host}:${port}/api/v1/${pathModule}`;


    if (!url || !/^https?:\/\//.test(url)) {
      throw new Error(`URL inválida: ${url}`);
    }
    // Navegar até a URL
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    // Configurar opções do PDF
    const pdfOptions = {
      displayHeaderFooter: true,
      format: typePaper,
      headerTemplate: header || '<>',
      footerTemplate: footer || '<>',
      scale: 1,
      printBackground: true,
      preferCSSPageSize: true,
    };

    // Gerar PDF
    const pdfBuffer = await page.pdf(pdfOptions);

    // Definir cabeçalho da resposta
    response.header('Content-Type', 'application/pdf');

    // Enviar PDF para o navegador
    return response.send(pdfBuffer);

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    response.status(500).send('Erro ao gerar PDF');
  } finally {
    await browser.close();
  }

}

// Enviar PDF para o navegador
export async function readPdf({
  response,
  baseUrlFileTemplate,
  locationTemplate,
  nameFileTemplate,
  data,
}: ReadPdfOptions): Promise<void | null> {

  try {
    const locationTemplateDefault = "./../templates"
    const nameFileTemplateDefault = "default_document.ejs"

    // Construindo o caminho do arquivo
    const filePath = path.join(
      baseUrlFileTemplate || baseUrlFile, // Se não fornecido, usa string vazia
      locationTemplate || locationTemplateDefault,
      nameFileTemplate || nameFileTemplateDefault
    );

    // Renderizando o arquivo EJS
    ejs.renderFile(filePath, (data), (err, html) => {
      if (err) {
        console.error('Erro ao renderizar o arquivo EJS:', err);
        return response.status(500).send("Erro na leitura do arquivo!");
      }
      return response.send(html);
    });
  } catch (error) {
    console.error('Erro na leitura do arquivo no servidor:', error);
    return response.status(500).send("Erro na leitura do arquivo!");
  }
}

