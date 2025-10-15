import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Database.from('users').where('pessoa_id', 60).update({
      aceder_todos_agentes: 1,
      aceder_painel_piips: 1
    })

    await Database.from('sigpq_funcionario_orgaos').where('pessoafisica_id', 60).update({
      eliminado: 0
    })
  }
}
