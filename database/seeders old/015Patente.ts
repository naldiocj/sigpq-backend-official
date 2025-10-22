import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  #table = "patentes";

  public async run() {

    const dataNew = [

      { 'user_id': 1, 'classe': 'Oficial Comissário', 'nome': 'Comissário Geral', 'sigla': 'CG', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Oficial Comissário', 'nome': 'Comissário-Chefe', 'sigla': 'CC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Oficial Comissário', 'nome': 'Comissário', 'sigla': 'C', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Oficial Comissário', 'nome': 'Sub-Comissário', 'sigla': 'SC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Oficial Superior', 'nome': 'Superintendente-Chefe', 'sigla': 'SIC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Oficial Superior', 'nome': 'Superintendente', 'sigla': 'SI', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Alterno', 'nome': 'Intendente', 'sigla': 'I', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Alterno', 'nome': 'Inspector-Chefe', 'sigla': 'IC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Alterno', 'nome': 'Subinspector', 'sigla': 'IC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Alterno', 'nome': 'Inspector', 'sigla': 'I', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Chefe', 'nome': '1º Sub-Chefe', 'sigla': '1º SC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Chefe', 'nome': '2º Sub-Chefe', 'sigla': '2º SC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Sub-Chefe', 'nome': '3º Sub-Chefe', 'sigla': '3º SC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Agente', 'nome': 'Agente 1º', 'sigla': 'A 1º', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Agente', 'nome': 'Agente 2º', 'sigla': 'A 2º', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Agente', 'nome': 'Agente', 'sigla': 'A', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Civil', 'nome': 'Técnico Civil', 'sigla': 'TC', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Civil', 'nome': 'Alistado', 'sigla': 'AL', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'classe': 'Civil', 'nome': 'Sem patente', 'sigla': 'SP', 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },

    ];

    // await repo.createMany(dataNew)
    for (const iterator of dataNew) {
      await Database
        .insertQuery() // 👈 gives an instance of insert query builder
        .table(this.#table)
        .insert(iterator)
    }
    console.log("Patente registado.");
  }
}
