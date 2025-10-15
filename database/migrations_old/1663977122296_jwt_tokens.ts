import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class JwtTokens extends BaseSchema {
  protected tableName = 'jwt_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('is_revoked').defaultTo(0)
      table.string('token', 64).notNullable().unique()
      table.dateTime('expires_at', { useTz: true }).nullable()
      table.string('refresh_token').notNullable().unique().index()
      table.dateTime('refresh_token_expires_at', { useTz: true }).notNullable()
      table.dateTime('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
