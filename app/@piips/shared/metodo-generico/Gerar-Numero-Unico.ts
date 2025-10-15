function gerarUnicoNumeroParaFicheiro(): number {
    const timestamp = new Date().getTime() // Obter o timestamp atual
    const random = Math.random() * 1000 // Gerar um número aleatório entre 0 e 1000
    const uniqueNumber = Math.floor(timestamp + random) // Arredondar para o número inteiro mais próximo

    return uniqueNumber
}

function gerarCodigoASCII(): number {

    return Math.floor(Math.random() * (90 - 65) + 65);
}



function gerarUnicoNumeroParaProcesso(num: any = null): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    if (num) {
        return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}${num}`;
    } else {
        return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
    }
}

function gerarAlfabetoTriplo(): string {
    return String.fromCharCode(gerarCodigoASCII(), gerarCodigoASCII(), gerarCodigoASCII())
}


function gerarSegundoPorAno(): string {
    const hoje: Date = new Date();

    const anoAtual: number = hoje.getFullYear();

    const inicioAno: Date = new Date(anoAtual, 0, 1);
    const diferencaMilissegundos: number = hoje.getTime() - inicioAno.getTime();

    const milissegundosPorHora: number = 1000 * 60 * 60;
    const horasPassadas: number = diferencaMilissegundos / milissegundosPorHora;

    return Math.floor(horasPassadas).toString();
}

module.exports = {
    gerarUnicoNumeroParaFicheiro,
    gerarUnicoNumeroParaProcesso,
    gerarAlfabetoTriplo,
    gerarSegundoPorAno
}
