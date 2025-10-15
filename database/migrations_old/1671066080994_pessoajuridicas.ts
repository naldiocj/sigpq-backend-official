import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {  
  public async up() {
    this.schema.createTable('pessoajuridicas', (table) => {
      table.integer('id').primary()
      table.string('nif').notNullable()
      table.string('sigla').notNullable()
      table.string('site').nullable()
      table.string('logotipo').nullable()
      table.string('descricao').nullable()
      table.boolean('activo').defaultTo(true)
      table.integer('pessoajuridica_id')
        .comment('representa id da pessoa jurídica, ou seja, id da entidade que é o seu supervisor')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('pessoas')
        .onDelete('RESTRICT')
      table.integer('tipo_pessoajuridica_id')
        .unsigned()
        .references('id')
        .inTable('tipo_pessoajuridicas')
        .onDelete('RESTRICT')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable('pessoajuridicas')
  }
}
