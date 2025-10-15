// import Database from '@ioc:Adonis/Lucid/Database'
import Database from '@ioc:Adonis/Lucid/Database';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  #table = "mes";

  public async run() {

    const dataNew = [

      { 'user_id': 1, 'nome': 'Janeiro', 'sigla': 'Jan', 'dia': 31, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Fevereiro', 'sigla': 'Fev', 'dia': 28, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Março', 'sigla': 'Mar', 'dia': 30, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Abril', 'sigla': 'Abr', 'dia': 30, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Maio', 'sigla': 'Mai', 'dia': 31, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Junho', 'sigla': 'Jun', 'dia': 30, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Julho', 'sigla': 'Jul', 'dia': 31, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Agosto', 'sigla': 'Ago', 'dia': 31, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Septembro', 'sigla': 'Sep', 'dia': 30, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Outubro', 'sigla': 'Out', 'dia': 31, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Novembro', 'sigla': 'Nov', 'dia': 30, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },
      { 'user_id': 1, 'nome': 'Dezembro', 'sigla': 'Dez', 'dia': 31, 'descricao': 'Criado automaticamente pelo sistema', 'created_at': new Date(), 'updated_at': new Date() },

    ];

    
    for (const iterator of dataNew) {
      await Database
        .insertQuery() // 👈 gives an instance of insert query builder
        .table(this.#table)
        .insert(iterator)
    }
    console.log("Meses registado.");
  }
}
