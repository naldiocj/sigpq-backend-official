import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Config from '@ioc:Adonis/Core/Config'

export default class Roles extends BaseSchema {
  protected tableName = Config.get('rolePermission.role_table', 'roles')

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('modulo_id')
        .unsigned()
        .references('id')
        .inTable('modulos')
        // .notNullable()
        .onDelete('RESTRICT')
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.string('nome', 191)
      table.string('name', 191)
      table.boolean('activo').defaultTo(true)
      table.boolean('eliminado').defaultTo(false)
      table.string('descricao').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true }).nullable()
      table.dateTime('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
