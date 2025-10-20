import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import PaisRepositorio from 'App/Repositories/PaisRepository'

export default class extends BaseSeeder {
  public async run() {
    // const paiRepo = new PaisRepositorio()

    // Write your database queries inside the run method
    const dataNew = [
      {
        user_id: 1,
        nome: 'Angola',
        name: 'Angolan',
        nacionalidade: 'Angolana',
        sigla: 'AO',
        descricao: 'Pais africano',
        activo: true,
        eliminado: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 1,
        nome: 'Brasil',
        name: 'Brasilian',
        nacionalidade: 'Brazileira',
        sigla: 'BR',
        descricao: 'Pais',
        activo: true,
        eliminado: false,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]

    // await repo.createMany(dataNew)
    for (const iterator of dataNew) {
      await Database
        .insertQuery() // 👈 gives an instance of insert query builder
        .table('pais')
        .insert(iterator)
    }
    console.log("Pais registado.");
  }
}
