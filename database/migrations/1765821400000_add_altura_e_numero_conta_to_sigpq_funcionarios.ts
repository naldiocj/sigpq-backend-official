import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sigpq_funcionarios'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('altura').nullable()
      table.string('numero_conta').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('altura')
      table.dropColumn('numero_conta')
    })
  }
}
