import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pessoas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('numero_ordem').unsigned().nullable()
      table.string('nome_completo', 191).notNullable()
      table.string('email_pessoal', 191).nullable()
      table.enum('tipo', ['pf', 'pj']).notNullable()
      table.boolean('activo').defaultTo(true)
      table.boolean('eliminado').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}