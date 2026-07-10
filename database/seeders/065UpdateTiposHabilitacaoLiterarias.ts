import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UpdateTiposHabilitacaoLiterariasSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    const mappings = [
      { fromId: 25, toId: 21 },
      { fromId: 26, toId: 22 },
    ]

    for (const { fromId, toId } of mappings) {
      const source = await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('id', fromId)
        .first()

      if (!source) {
        console.log(`Registo de origem não encontrado: ID ${fromId}`)
        continue
      }

      const target = await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('id', toId)
        .first()

      if (!target) {
        console.log(`Registo de destino não encontrado: ID ${toId}`)
        continue
      }

      await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('id', toId)
        .update({
          nome: source.nome,
          sigla: source.sigla,
          descricao: source.descricao,
          activo: source.activo,
          updated_at: now,
        })

      console.log(`ID ${toId} atualizado com os dados do ID ${fromId}`)
    }
  }
}
