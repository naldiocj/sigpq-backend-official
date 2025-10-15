import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const dateTime = new Date();
const codigo: string = `${Math.floor(Math.random() * 999)}  - ${Math.floor(Math.random() * 999)} - ${Math.floor(Math.random() * 999)}`;

export default class extends BaseSeeder {

  public async run() {

    const gravidades = [
      {
        nome: "Confidencial",
        sigla: 'CFC',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Empresário",
        sigla: 'EMP',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Muito Secreto",
        sigla: 'MS',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Normal",
        sigla: 'NM',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Secreto",
        sigla: 'SC',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
    ]



    for (let item of gravidades) {
      await Database.insertQuery().table('tipo_naturezas').insert(item)
    }

    console.log('Criado com sucesso')

  }
}
