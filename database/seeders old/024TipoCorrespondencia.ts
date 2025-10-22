import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const dateTime = new Date();

export default class extends BaseSeeder {

  public async run() {

    const gravidades = [
      {
        nome: "Informação/Info. Especial",
        sigla: 'INFO',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Informe",
        sigla: 'Justificado',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Mapa",
        sigla: 'MP',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Memorandum",
        sigla: 'MMRM',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Mensagem",
        sigla: 'MSG',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Nota",
        sigla: 'NT',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Oficia",
        sigla: 'OF',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Parecer",
        sigla: 'PRC',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Participacao",
        sigla: 'PTCPC',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Pedido",
        sigla: 'PDD',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Programa",
        sigla: 'PRG',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Pronunciamento",
        sigla: 'PNCMNT',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Proposta",
        sigla: 'PRPT',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Queixa-crime",
        sigla: 'QCR',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Reclamacao",
        sigla: 'RCL',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Referencia",
        sigla: 'RFC',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Reflexao",
        sigla: 'RFL',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Relatório",
        sigla: 'RLT',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Remessa",
        sigla: 'RMS',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Requerimento",
        sigla: 'RQR',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Requisicao",
        sigla: 'RQS',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Resposta",
        sigla: 'RPS',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Resumario",
        sigla: 'RSM',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Solicitacao",
        sigla: 'SL',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Termo",
        sigla: 'TM',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Visita",
        sigla: 'VST',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
    ]



    for (let item of gravidades) {
      await Database.insertQuery().table('tipo_correspondencias').insert(item)
    }

    console.log('Criado com sucesso')

  }
}
