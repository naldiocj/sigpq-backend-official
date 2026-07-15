import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AddTipoSanguineoNCSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    const existing = await Database
      .from('sigpq_tipo_sanguineos')
      .where('nome', 'Não consta.')
      .first()

    if (!existing) {
      await Database
        .insertQuery()
        .table('sigpq_tipo_sanguineos')
        .insert({
          nome: 'Não consta.',
          sigla: 'N/C',
          user_id: 1,
          descricao: 'Criado automaticamente pelo sistema.',
          created_at: now,
          updated_at: now,
        })
    }
  }
}
