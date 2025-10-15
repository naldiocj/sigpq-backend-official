import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema { 
  public async up() {
    this.schema.createTable('mes', (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.string('sigla').notNullable()
      table.integer('dia').notNullable()
      table.string('descricao').nullable()
      table.boolean('activo').defaultTo(true)
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.boolean('eliminado').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable('mes')
  }
}
