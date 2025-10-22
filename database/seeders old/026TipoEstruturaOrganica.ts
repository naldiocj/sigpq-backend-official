import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {

  public async run() {

    const estruturaOrganicas = [
      {
        name: "Serviços de Apoio Instrumental",
        sigla: "SAI",
        ...this.getData,
        user_id: 1
      },
      {
        name: "Serviços de Apoio Técnico",
        sigla: "SAT",
        ...this.getData,
        user_id: 1
      },
      {
        name: "Órgão de Doutrina e Ensíno Policial",
        sigla: "ODEP",
        ...this.getData,
        user_id: 1
      },
      {
        name: "Unidades Centrais",
        sigla: "UC",
        ...this.getData,
        user_id: 1
      },
      {
        name: "Unidades Territórais",
        sigla: "UT",
        ...this.getData,
        user_id: 1
      }
    ]

    for (let item of estruturaOrganicas) {
      await Database.insertQuery().table('tipo_estrutura_organicas').insert(item)
    }

  }


  private get getData() {
    return {
      created_at: new Date(),
      updated_at: new Date()
    }
  }
}
