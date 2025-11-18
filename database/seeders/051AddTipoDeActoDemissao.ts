import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run() {
    // Insere o registro na tabela 'motivos'
    await Database.insertQuery()
    .table('sigpq_acto_progressaos')
    .insert({
        nome: 'Demissão',
        sigla: 'DEM',
        descricao: 'Criado automaticamente pelo sistema.',
        activo: 1,
        user_id: 1,
        ordem: 6,
        created_at: new Date(),
        updated_at: new Date(),
      })
  }
}