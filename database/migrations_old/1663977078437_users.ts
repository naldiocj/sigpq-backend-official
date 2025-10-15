import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 50).notNullable() // ++
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.boolean('notificar_por_email').defaultTo(false)
      table.boolean('forcar_alterar_senha').defaultTo(true)
      table.integer('pessoa_id')
        .unsigned()
        .references('id')
        .inTable('pessoas')
        .onDelete('RESTRICT')
      table.boolean('activo').defaultTo(true)
      table.boolean('eliminado').defaultTo(false)
      table.string('descricao').nullable()
      table.string('remember_me_token').nullable()
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
