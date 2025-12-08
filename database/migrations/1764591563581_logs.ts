import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Logs extends BaseSchema {
  protected tableName = 'logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // 1. ID - Chave Primária
      table.increments('id').primary()
      
      // Usamos timestamp para registrar o momento do log.
      table.timestamp('timestamp', { useTz: true }).notNullable()
      
      // 3. level - Nível de severidade (error, warn, info, etc.)
      table.string('level', 10).notNullable()

       table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      
      // 4. message - A mensagem principal do log
      table.text('message').notNullable()
      
      // 5. meta - Dados adicionais como stack trace ou user ID
      // O tipo JSON é o mais adequado para o objeto de metadados do Winston.
      table.json('meta').nullable() 
      
      // Índices
      // É útil indexar o 'level' para buscas e o 'timestamp' para ordenação.
      table.index(['level'])
      table.index(['timestamp'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}