import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

const updates = [
  { sigla: '6º', nome: '6º. ANO' },
]

export default class UpdateTiposNivelAcademicosSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    for (const item of updates) {
      const existing = await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('sigla', item.sigla)
        .first()

      if (existing) {
        await Database
          .from('sigpq_tipo_habilitacaoliterarias')
          .where('sigla', item.sigla)
          .update({
            nome: item.nome,
            updated_at: now,
          })
      }
    }
  }
}
