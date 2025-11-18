import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run() {
    await Database
      .from('provincias') // Substitua 'provincias' pelo nome real da sua tabela
      .where('id', 5)
      .update({ 
        nome: 'Cubango',
        updated_at: new Date(), // É boa prática atualizar o timestamp de 'updated_at'
      })
  }
}