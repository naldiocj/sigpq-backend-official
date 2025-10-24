
import fs from "fs/promises";
import pdf from "pdf-parse";
import path from "node:path";

const { gerarUnicoNumeroParaFicheiro } = require("./Gerar-Numero-Unico");
// const fs = require('fs')

const { baseUrlFile, baseUrl } = require("./Configuracao-Base");

export async function uploadFile(
  filePathAux: string,
  file: any
): Promise<string | null> {

  console.log('Upload file called with : ', filePathAux, file.extname);

  try {
    var nameFile = `${gerarUnicoNumeroParaFicheiro()}.${file.extname}`;
    const filePath = `${baseUrlFile}/${filePathAux}`;

    await file.move(filePath, { name: nameFile });

    return "/" + filePathAux + "/" + nameFile;
  } catch (error) {
    console.log("Erro ao carregar arquivo no servidor : ", error);
    return null;
  }
}

export async function deleteFile(
  filePathAux: string,
  nameFile: string
): Promise<boolean> {
  try {
    // Define o caminho e o nome do arquivo
    const filePath = `${baseUrlFile}/${filePathAux}/${nameFile}`;

    // const fileExists = await Drive.exists(filePath)
    // console.log('Existe : ',fileExists);

    // Verificar se o arquivo existe antes de excluí-lo
    fs.unlink(filePath);

    return true;
  } catch (error) {
    console.log("Erro ao eliminar arquivo no servidor : ", error);
    return false;
  }
}

export async function deleteFileUrl(url: string): Promise<boolean> {
  try {
    // Verificar se o arquivo existe antes de excluí-lo
    const filePath = `${baseUrlFile}/${url}`;
    fs.unlink(filePath);

    return true;
  } catch (error) {
    console.log("Erro ao eliminar arquivo no servidor : ", error);
    return false;
  }
}

export async function deleteDirectory(dirPath: string): Promise<boolean> {
  try {
    const filePath = `${baseUrlFile}/${dirPath}`;
    await fs.rm(filePath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.log("Erro ao eliminar pasta no servidor : ", error);
    return false;
  }
}

export async function getFile(
  filePathAux: string,
  base: boolean = false
): Promise<any> {
  if (!filePathAux) {
    return null;
  }

  // try {

  // Verificar se o arquivo existe antes de excluí-lo
  const filePath = base ? baseUrlFile + filePathAux : baseUrl + filePathAux;
  // console.log(filePath);
  // console.log(filePathAux);

  // console.log(baseUrlFile);

  // console.log(filePath);

  return filePath;

  // const filePath = `${baseUrlFile}/${dirPath}`
  const arquivoBinario = await fs.readFile(filePath);
  // const arquivoBase64 = arquivoBinario.toString('base64')

  // Retornar o URL do arquivo
  return arquivoBinario;
  // } catch (error) {
  // console.log('Erro ao visualizar arquivo no servidor : ', error);
  // Lidar com o caso em que o arquivo não existe
  // response.status(404).send('Arquivo não encontrado')
  // return false
  // }
}

export async function getFileUrl(filePath: string = ""): Promise<boolean> {
  console.log(filePath);

  try {
    // Verificar se o arquivo existe antes de excluí-lo

    return false;
  } catch (error) {
    console.log("Erro ao eliminar arquivo no servidor : ", error);
    return false;
  }
}

export async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    const buffer = await fs.readFile(filePath);
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    console.log(
      "Error to processar o arquivo PDF " + filePath + "Error " + error
    );
    return "";
  }
}

export async function searchPDFsInDirectory(
  directoryPath: string,
  searchTerm: string
): Promise<string[]> {
  const filesFound: any = [];
  try {
    const files = await fs.readdir(directoryPath);
    const pdfFiles = files.filter(
      (file: any) => path.extname(file).toLowerCase() === ".pdf"
    );

    for (let file of pdfFiles) {
      const filePath = path.join(directoryPath, file);

      let text = await extractTextFromPDF(filePath);

      if (text.includes(searchTerm)) {
        filesFound.push(file);
      }
    }

    return filesFound;
  } catch (error) {
    console.error("Erro ao ler o diretório ou processar arquivos:", error);
    return [];
  }
}

module.exports = {
  uploadFile,
  deleteFile,
  deleteFileUrl,
  getFile,
  deleteDirectory,
  searchPDFsInDirectory,
};
