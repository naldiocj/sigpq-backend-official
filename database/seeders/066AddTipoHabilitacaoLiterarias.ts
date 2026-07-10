import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AddTipoHabilitacaoLiterariasSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    const data = [
      { nome: 'TECNICO SUPERIOR', sigla: 'TS' },
    ]

    for (const item of data) {
      const existing = await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('id', 22)
        .first()

      if (existing) {
        await Database
          .from('sigpq_tipo_habilitacaoliterarias')
          .where('id', 22)
          .update({
            nome: item.nome,
            sigla: item.sigla,
            updated_at: now,
          })
      }
    }
  }
}
