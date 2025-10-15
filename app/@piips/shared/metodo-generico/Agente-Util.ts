
/***
 * @author 'noexcript@gmail.com'
 * @param {string} regime
 * @param {string} funcao
 * @param {string} cargo
 * @retuns {string}
 * @description 'Com base no regime do regime do agente, vai terminar se o agente tem cargo ou função'
 */

const buscarFuncao = (regime: string, funcao: string, cargo: string): string => {

    if (!regime) return 'S/N'

    if (['especial'].includes(regime.toLowerCase())) {
        if (!cargo) return 'S/N'
        return cargo
    } else if (['geral'].includes(regime.toLowerCase())) {
        if (!funcao) return 'S/N'
        return funcao
    } else {
        return 'S/N'
    }

}

/**
 * @author 'noexcript@gmail.com'
 * @param {string} text 
 * @returns string
 */

const capitalize = (text: string): string => {
    if (!text) return 'S/N';

    const prepositions = new Set(['da', 'de', 'do', 'das', 'e', 'o']);
    const values = text.split(' ');

    return values
        .map(val => {
            val = val.toLowerCase();
            return prepositions.has(val)
                ? val
                : val.charAt(0).toUpperCase() + val.slice(1);
        })
        .join(' ');
}
/**
 * 
 * @param {string} nome 
 * @param {string} apelido 
 * @param {boolean} [apelid=false] 
 * @returns {string}
 */

function criarApelido(nome: string, apelido: string | null, apelid: boolean = true): string {
    if (!nome && !apelido) return 'S/N'

    let nome_completo: string | Array<string> = nome
    if (apelido) {
        if (nome_completo.toString().includes(apelido))
            nome = nome_completo.toString().replace(apelido, '')
    } else {
        nome_completo = nome.split(' ')

        let apel = nome_completo[nome_completo.length - 1]
        if (['da', 'de', 'do', 'das', 'dos'].includes(nome_completo[nome_completo.length - 2].toString()?.toLowerCase())) {
            apel = nome_completo[nome_completo.length - 2] + ' ' + apel
        }

        nome = nome.replace(apel, '')
        apelido = apel
    }
    return apelid ? apelido : nome
}



module.exports = {
    buscarFuncao,
    capitalize,
    criarApelido
}
