import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

const updates = [
  { sigla: '1º', nome: '1º. ANO' },
  { sigla: '2º', nome: '2º. ANO' },
  { sigla: '3º', nome: '3º. ANO' },
  { sigla: '4º', nome: '4º. ANO' },
  { sigla: '5º', nome: '5º. ANO' },
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
