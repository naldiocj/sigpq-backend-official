import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sigpq_funcionarios'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('orgao_proveniencia', 255).nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('orgao_proveniencia')
    })
  }
}
