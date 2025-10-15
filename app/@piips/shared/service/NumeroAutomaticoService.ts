import Database from '@ioc:Adonis/Lucid/Database';
import moment from 'moment';
const { mesmoAno, mesmoDia } = require('App/@piips/shared/metodo-generico/Buscar-Data-Extensao')


export default class NumeroAutomaticoService {
    public async gerarNumeroAutomatico(tipo: string): Promise<number> {
        const dateTime = new Date()
        const dataAtual = moment().format('YYYY-MM-DD');
        let contador = 0;

        // Verifica se já existe um registro para a data atual
        const registroDiario = await Database.from('contadores_diarios').where('tipo', tipo).where('data', dataAtual).first();

        if (registroDiario) {
            contador = registroDiario.contador + 1;
            await Database.from('contadores_diarios').where('tipo', tipo).where('data', dataAtual).update({ contador });
        } else {
            await Database.table('contadores_diarios')
                .insert({
                    data: dataAtual,
                    tipo,
                    contador,
                    created_at: dateTime,
                    updated_at: dateTime
                })
        }

        return contador;
    }
    
    public async gerarNumeroDataAutomatico(): Promise<AnyObject> {
        const dataAtual = moment().format('YYYY-MM-DD');
        let numero_ordem = 1;
        let numero_despacho = 1;

        const ultimoRegisto = await Database.from('sigpq_provimentos').select('*').orderBy('id', 'desc').where('situacao', 'actual').where('eliminado', false).first();
        if (ultimoRegisto) {
            if (mesmoAno(dataAtual, ultimoRegisto.ordem_data) && mesmoDia(dataAtual, ultimoRegisto.ordem_data)) {
                numero_ordem = ultimoRegisto.numero_ordem
            } else if (mesmoAno(dataAtual, ultimoRegisto.ordem_data)) {
                numero_ordem = Number(ultimoRegisto.numero_ordem) + 1;
            }
            if (mesmoAno(dataAtual, ultimoRegisto.numero_despacho) && mesmoDia(dataAtual, ultimoRegisto.numero_despacho)) {
                numero_despacho = ultimoRegisto.numero_despacho
            } else if (mesmoAno(dataAtual, ultimoRegisto.numero_despacho)) {
                numero_despacho = Number(ultimoRegisto.numero_despacho) + 1;
            }
        }

        return { numero_ordem, numero_despacho, ordem_data: dataAtual, despacho_data: dataAtual };
    }

    public async gerarNumeroAutomaticoDesconto(tipo: string): Promise<number> {
        const dateTime = new Date()
        const dataAtual = moment().format('YYYY-MM-DD');
        let contador = 0;

        // Verifica se já existe um registro para a data atual
        const registroDiario = await Database.from('contadores_diarios').where('tipo', tipo).where('data', dataAtual).first();

        if (registroDiario) {
            contador = registroDiario.contador - 1;
            await Database.from('contadores_diarios').where('tipo', tipo).where('data', dataAtual).update({ contador, updated_at: dateTime });
        }

        return contador;
    }

    public async gerarReferenciaDoc(): Promise<string> { 

        const anoAtual = moment().format('YYYY'); 

        let numeroReferencia = 1; 
        // Verifica se já existe um registro no mesmo ano 
        const ultimoRegistro = await Database.from('sigdoc_entrada_expedientes') 
        .where('referenciaDoc', 'like', `%/${anoAtual}`)
        .orderBy('referenciaDoc', 'desc') 
        .first(); 
        
        if (ultimoRegistro && ultimoRegistro.referenciaDoc) { 
            const ultimoNumero = parseInt(ultimoRegistro.referenciaDoc.split('/')[0], 10); 
            numeroReferencia = ultimoNumero + 1; 
        }
         
         const referenciaDoc = `${numeroReferencia.toString().padStart(3, '0')}/${anoAtual}`; 
         
        return referenciaDoc; 
    }
}

