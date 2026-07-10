import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RemoveTiposHabilitacaoLiterariasSeeder extends BaseSeeder {
  public async run() {
    const idsToRemove = [25, 26]

    for (const id of idsToRemove) {
      const existing = await Database
        .from('sigpq_tipo_habilitacaoliterarias')
        .where('id', id)
        .first()

      if (existing) {
        await Database
          .from('sigpq_tipo_habilitacaoliterarias')
          .where('id', id)
          .delete()

        console.log(`Registo removido: ID ${id} - ${existing.nome}`)
      } else {
        console.log(`Registo não encontrado: ID ${id}`)
      }
    }
  }
}
