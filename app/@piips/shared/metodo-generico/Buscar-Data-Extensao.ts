
import date from 'date-and-time'

function formatDate(data: any = null, format: string = 'YYYY/MM/DD') {
    try {

        if (!data) {
            return date.format(new Date(), format);
        }
        if (typeof data === 'string' && /^(\d{2}\/\d{2}\/\d{4})$/.test(data)) {
            data = data.split('/').reverse().join('-');
        }
        return date.format(data, format);
    } catch (e) {
        return null
    }
}
function dataPorExtensao(dat: any, ano: boolean = true): any {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    dat = new Date(dat)


    dat = formatDate(dat)

    const data = new Date(dat)


    if (['Invalid Date'].includes(data.toString())) return null

    const data_descricao = ano ? `${getDia(data.getDate())} de ${meses[data.getMonth()]} de ${data.getFullYear()}` : `${getDia(data.getDate())} de ${meses[data.getMonth()]}`
    return {
        ano: data.getFullYear(),
        extensao: data_descricao
    }
}

function anosService(data: string | Date): number {
    data = new Date(data)
    data = formatDate(data)!

    const d: Date = new Date(data)


    return Number((new Date()).getFullYear()) - Number(d.getFullYear())
}

function diasFerias(data: string): number {
    const dias: number = anosService(data)
    return (30 + dias) as number
}


function getDia(dia: number) {
    return dia.toString().length == 2 ? dia : `0${dia}`
}


function extensao_ordem(data: any, numero: any) {

    const ano_ordem = dataPorExtensao(data, false)
    return ano_ordem ? `${numero}/${ano_ordem.ano}, de ${ano_ordem.extensao}` : null
}


function extensao_despacho(data: any, numero: any) {

    const ano_despacho = dataPorExtensao(data, false)
    return ano_despacho ? `${numero}/${ano_despacho.ano}, de ${ano_despacho.extensao}` : null
}
function criarData(data: string): Date {
    return new Date(data)
}

export function mesmoAno(primeiraData: string, segundaData: string): boolean {
    const primeiro = formatDate(criarData(primeiraData))
    const segunda = formatDate(criarData(segundaData))
    if (primeiro && segunda) {
        const primeiroAno = new Date(primeiro).getFullYear()
        const segundoAno = new Date(segunda).getFullYear()
        return primeiroAno === segundoAno
    } else {
        return false;
    }
}
export function mesmoDia(primeiraData: string, segundaData: string): boolean {
    const primeiro = formatDate(criarData(primeiraData))
    const segunda = formatDate(criarData(segundaData))
    if (primeiro && segunda) {
        const primeiroDia = new Date(primeiro).getDate()
        const segundoDia = new Date(segunda).getDate()
        return primeiroDia === segundoDia
    } else {
        return false;
    }
}

export function subtrairDataEmAnos(data: string): number {  
    
    const dataInicial = new Date(data);
    const dataAtual = new Date();

    let anos = dataAtual.getFullYear() - dataInicial.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const mesAniversario = dataInicial.getMonth();
    const diaAniversario = dataInicial.getDate();

    if (
        mesAtual < mesAniversario ||
        (mesAtual === mesAniversario && diaAtual < diaAniversario)
    ) {
        anos--;
    }

    return anos < 0 ? 0 : anos;
}



module.exports = {
    dataPorExtensao,
    formatDate,
    extensao_ordem,
    extensao_despacho,
    anosService,
    diasFerias,
    mesmoAno,
    mesmoDia,
    subtrairDataEmAnos

}


