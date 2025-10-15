
import { jsPDF } from "jspdf";

const { gerarUnicoNumeroParaFicheiro } = require('./Gerar-Numero-Unico')
// const fs = require('fs')

const { baseUrlFile, baseUrl } = require('./Configuracao-Base')
// const fs = require('fs');
import fs from 'fs'

const margin = 25;
const lineHeight = 10;
const pageWidth = 210;
const maxLineWidth = pageWidth - margin * 2;


export type TLicenca = {
    orgao: string,
    evento: string,
    funcao: string,
    nome: string
    patente: string,
    data: string,
    endereco: string,
    conteudo: string,
    pessoafisica_id: number
}

/***
 * @author "noexcript@gmail.com"
 * @param {Object} licenca
 * @param {string} licenca.orgao
 * @param {string} licenca.evento
 * @param {string} licenca.funcao
 * @param {string} licenca.nome
 * @param {string} licenca.patente
 * @param {string} licenca.data
 * @param {string} licenca.endereco
 * @param {string} licenca.conteudo
 * @param {number} licenca.pessoafisica_id
 * @returns {string}
 */


async function gerarLicenca(licenca: TLicenca): Promise<any> {

    const doc = new jsPDF();

    function loadImage(filePath: string) {
        return fs.readFileSync(baseUrl + filePath, 'base64');
    }

    const logoImage = loadImage('app/@piips/shared/public/img/logo.png');
    const logoRepo = loadImage('app/@piips/shared/public/img/rep.png');

    function addHeader() {
        const imgWidth = 25, imgHeight = 20;
        const x = (pageWidth - imgWidth) / 2;

        doc.addImage(logoImage, 'PNG', x, 10, imgWidth, imgHeight);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('REPÚBLICA DE ANGOLA', pageWidth / 2, 40, { align: 'center' });
        doc.text('MINISTÉRIO DO INTERIOR', pageWidth / 2, 46, { align: 'center' });
        doc.text('---« »---', pageWidth / 2, 52, { align: 'center' });
        doc.text('POLÍCIA NACIONAL DE ANGOLA', pageWidth / 2, 58, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(licenca.orgao.toUpperCase(), pageWidth / 2, 66, { align: 'center' });
        doc.text(licenca.evento.toUpperCase(), pageWidth / 2, 90, { align: 'center' });
    }

    function justifyText(text: string, x: number, y: number) {
        const splitText = doc.splitTextToSize(text, maxLineWidth);
        let lineY = 0
        splitText.forEach((line: string, index: number) => {
            lineY = y + index * lineHeight;
            const words = line.split(' ');
            const numWords = words.length;

            if (index === splitText.length - 1) {
                doc.text(line, x, lineY);
            } else if (numWords > 1) {
                const lineWidth = doc.getTextWidth(line);
                const spaceWidth = (maxLineWidth - lineWidth) / (numWords - 1);

                let currentX = x;
                words.forEach((word) => {
                    doc.text(word, currentX, lineY);
                    currentX += doc.getTextWidth(word) + spaceWidth + 2;
                });
            } else {
                doc.text(line, x, lineY);
            }
        });

        return lineY
    }

    function addBody() {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        const fullText: string = licenca.conteudo
        let initialY = 110;
        const lineY = justifyText(fullText, margin, initialY);
        doc.text('Deve comparecer nos Tribunais sempre que seja intimado ou requisitado.', margin, lineY + 20);
    }

    function addFooter() {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        const footerY = 290;
        doc.text(`${licenca.endereco}`, margin, footerY, { maxWidth: 110 });
        doc.addImage(logoRepo, 'PNG', 130, footerY - 4, 10, 7);
        doc.text('POLÍCIA NACIONAL DE ANGOLA', 165, footerY + 2, { align: 'center' });
    }

    try {
        addHeader();
        addBody();

        doc.text('"Pela ordem e pela paz, ao serviço da Nação"', pageWidth / 2, 210, { align: 'center' });
        doc.text('Luanda, aos ' + licenca.data, margin, 230);
        doc.text(`O ${licenca.funcao}`, pageWidth / 2, 250, { align: 'center' });
        doc.setFont('helvetica', 'bold');
        doc.text(`${licenca.nome.toUpperCase()}`, pageWidth / 2, 260, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.text(`**${licenca.patente.toUpperCase()}**`, pageWidth / 2, 270, { align: 'center' });

        addFooter();

        var nameFile = `${gerarUnicoNumeroParaFicheiro()}`
        const filePathAux = licenca.pessoafisica_id
        const filePath = `${baseUrlFile}/${filePathAux}/${nameFile}.pdf`



        doc.save(filePath);

        return '/' + filePathAux + '/' + nameFile + '.pdf'
    } catch (error) {
        console.log(error)
        return Error('Não foi possível registar')
    }

}

module.exports = {
    gerarLicenca
}



