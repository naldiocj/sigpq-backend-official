import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { getDb } from 'start/mongo';
import { getDb } from './../../../../start/mongo'

// Definindo a interface para os parâmetros da função gerarLog
/**
    Tabela alterada: O nome da tabela que foi alterada ou onde o registro foi cadastrado.
    Tipo de operação: Indica se foi uma inserção (INSERT), atualização (UPDATE) ou exclusão (DELETE).
    Data e hora da operação: Registra o momento exato em que a operação ocorreu.
    Usuário que realizou a operação: Se aplicável, indica o usuário que realizou a alteração.
    Campos alterados: Lista os nomes e os valores antigos e novos dos campos que foram modificados.
    Valor antigo: O valor original do campo antes da alteração.
    Valor novo: O novo valor atribuído ao campo.
    IP de origem: O endereço IP do dispositivo que iniciou a operação.
 */
interface GerarLogsParams {
  request: HttpContextContract['request'];
  response: HttpContextContract['response'];
  auth: HttpContextContract['auth'];
  tipoOperacao: 'REGISTOU' | 'EDITOU' | 'ELIMINOU' | 'VISUALIZOU' | 'ACESSOU';
  valorAntigo?: any;
  valorNovo: any;
  descricao?: string;
}


// Função consumida só no backend para tornar a rota em pdf
export async function gerarLogs({
  request,
  response,
  auth,
  tipoOperacao,
  valorAntigo,
  valorNovo,
}: GerarLogsParams): Promise<void | null> {

  //await mongoClient;

  try {
    const collectionName = 'access_logs'
    const db = await getDb()

    const userFail = { id: null, nome: '- -', email: request.input('email') };
    const user: any = auth.user || userFail;

    //Filtar rota e tirar modulo
    const url = request.url();
    const match = url.match(/\/v1\/([^\/]+)/);
    const moduleName = match ? match[1] : null;

    // Inserir um documento
    const data = {
      tipoOperacao,
      dataHoraOperacao: new Date(),
      user: {
        id: user.id,
        nome: user.username,
        email: user.email,
      },
      valorAntigo,
      valorNovo,
      modulo: moduleName,
      rota: `${request.method()}: ${request.url()}`,
      ipOrigem: request.ip()
    };
    if (!db) {
      console.warn('⚠️ MongoDB indisponível, log não salvo.')
      return
    }
    await db.collection(collectionName).insertOne(data)
    //console.log('Log gerado com sucesso:', result);

  } catch (error) {

    console.error('Erro ao gerar Logs:', error);
  } finally {

    //await browser.close();
  }

}

