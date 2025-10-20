import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {
    await Database.from('modulos').where('sigla', 'SIGPQ').update({ nome: "Sistema de Gestão de Pessoal e Quadros" })

  }
}
