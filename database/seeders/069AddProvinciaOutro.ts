import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AddProvinciaOutroSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    const existing = await Database
      .from('provincias')
      .where('nome', 'Outro')
      .first()

    if (!existing) {
      await Database
        .insertQuery()
        .table('provincias')
        .insert({
          nome: 'Outro',
          sigla: 'Outro',
          pais_id: 1,
          user_id: 1,
          descricao: 'Criado automaticamente pelo sistema.',
          created_at: now,
          updated_at: now,
        })
    }
  }
}
