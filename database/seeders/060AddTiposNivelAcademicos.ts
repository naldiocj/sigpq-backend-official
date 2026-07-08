import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

const data = [
  { nome: 'LICENCIADO (a)', sigla: 'LC' },
  { nome: 'TÉCNICO MÉDIO', sigla: 'TM' },
  { nome: 'MESTRE', sigla: 'MSC' },
  { nome: 'TECNICO SUPERIOR', sigla: 'TS' },
]

export default class AddTiposNivelAcademicosSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    for (const item of data) {
      const existing = await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('nome', item.nome)
        .first()

      if (!existing) {
        await Database
          .table('sigpq_tipo_habilitacaoliterarias')
          .insert({
            nome: item.nome,
            sigla: item.sigla,
            descricao: 'Criado automaticamente pelo sistema.',
            activo: true,
            user_id: 1,
            eliminado: false,
            created_at: now,
            updated_at: now,
          })
      }
    }
  }
}
