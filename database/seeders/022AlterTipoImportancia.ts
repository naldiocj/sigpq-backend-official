import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const dateTime = new Date();


export default class extends BaseSeeder {

  public async run() {

    const importancias = [{
      sigla: 'IB',
      nome: 'Baixa',
      updated_at: dateTime
    },
    {
      sigla: 'IA',
      nome: 'Alta',
      updated_at: dateTime
    },
    {
      sigla: 'IM',
      nome: 'Média',
      updated_at: dateTime
    }]

    for (let item of importancias) {
      await Database.from('tipo_importancias').where('sigla', item.sigla).update({
        nome: item.nome,
        updated_at: item.updated_at
      })
    }

    console.log('Criado com sucesso')

  }
}
