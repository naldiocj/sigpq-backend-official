import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'pessoafisicas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.string('foto_civil').nullable()
      table.string('apelido').nullable()
      table.enum('genero', ['M', 'F']).notNullable()
      table.string('nome_pai').notNullable()
      table.string('nome_mae').notNullable()
      table.date('data_nascimento').notNullable()
      table.integer('nacionalidade_id')
        .unsigned()
        .references('id')
        .inTable('pais')
        .onDelete('RESTRICT')
      table.integer('estado_civil_id')
        .unsigned()
        .references('id')
        .inTable('estado_civils')
        .onDelete('RESTRICT')
      table.integer('regime_id')
        .unsigned()
        .references('id')
        .inTable('regimes')
        .onDelete('RESTRICT')
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
