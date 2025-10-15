import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

const dateTime = new Date();
const codigo: string = `${Math.floor(Math.random() * 999)}  - ${Math.floor(Math.random() * 999)} - ${Math.floor(Math.random() * 999)}`;

export default class extends BaseSeeder {

  public async run() {



    const importancias = [
      {
        nome: "Importância Alta",
        sigla: 'IA',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Importância Médio",
        sigla: 'IM',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
      {
        nome: "Importância Baixa",
        sigla: 'IB',
        user_id: 1,
        codigo: codigo,
        created_at: dateTime,
        updated_at: dateTime
      },
    ]



    for (let item of importancias) {
      await Database.insertQuery().table('tipo_importancias').insert(item)
    }

    console.log('Criado com sucesso')

  }
}
