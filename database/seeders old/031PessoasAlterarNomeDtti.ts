import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
   await Database.from('pessoas').where('id',323).orWhere('nome_completo', 'Direção de Telecomunicações e Tecnologias de Informação').update({
    nome_completo: 'DIRECÇÂO DE TELECOMUNICAÇÕES E TECNOLOGIAS DE INFORMAÇÃO'
   })
  }
}
