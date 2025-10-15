import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {

    const dataNew = {
      nome: 'Origem Estrangeira',
      sigla: 'AA',
      user_id: 1,
      pais_id: null,
      descricao: 'Criado automaticamente pelo sistema.',
      created_at: new Date(),
      updated_at: new Date()
    }
    await Database.insertQuery().table('provincias').insert(dataNew)
  }
}
