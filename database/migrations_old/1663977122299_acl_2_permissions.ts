import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Config from '@ioc:Adonis/Core/Config'

export default class Permissions extends BaseSchema {
  protected tableName = Config.get('rolePermission.permission_table', 'permissions')

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('modulo_id')
        .unsigned()
        .references('id')
        .inTable('modulos')
        .notNullable()
        .onDelete('RESTRICT')
      table.string('nome', 191)
      table.string('name', 191).unique()
      table.string('tabela', 191)
      table.string('operacao', 191)
      table.boolean('activo').defaultTo(true)
      table.string('descricao', 191).nullable()
      table.boolean('eliminado').defaultTo(false)

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
