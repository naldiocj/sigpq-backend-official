import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_historico_empregos_pessoa_fisica";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("empresa").defaultTo(null);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("empresa");
    });
  }
}
