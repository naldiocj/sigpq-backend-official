import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run() {
    await Database.from('pessoas').where('id', 346).orWhere('nome_completo', 'Direcçao de Pessoal e Quadros').update({
      nome_completo: 'DIRECÇÂO DE PESSOAL E QUADROS'
    })
  }
}
