import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const dateTime = new Date();

export default class extends BaseSeeder {

  public async run() {



    const gravidades = [
      {
        nome: "Interna",
        sigla: 'IT',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Externa",
        sigla: 'Et',
        user_id: 1,
        created_at: dateTime,
        updated_at: dateTime
      },
    
    ]



    for (let item of gravidades) {
      await Database.insertQuery().table('procedencia_correspondencias').insert(item)
    }

    console.log('Criado com sucesso')

  }
}
