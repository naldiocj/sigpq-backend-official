import fs from 'fs';
const { baseUrlFile, baseUrl } = require('./Configuracao-Base');

// Função para carregar a imagem em formato base64
function loadImage(filePath: string) {
  return fs.readFileSync(baseUrl + filePath, 'base64');
}

// Exportando as imagens
export const logoImage = loadImage('app/@piips/shared/public/img/logo.png');
export const logoRepo = loadImage('app/@piips/shared/public/img/rep.png');
export const logoRodaPe = loadImage('app/@piips/shared/public/img/logo-footer.jpeg');
//export const logoInsignia = loadImage('app/@piips/shared/public/img/insignia.png');
export const logoInsignia = loadImage('app/@piips/shared/public/img/logotipoInsignia_versao_final.png');
export const logoInsigniaMarcaDeAgua = loadImage('app/@piips/shared/public/img/imagem-marca-de-agua.png');
