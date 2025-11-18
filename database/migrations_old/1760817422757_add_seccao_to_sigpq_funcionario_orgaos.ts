import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionario_orgaos";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("seccao").defaultTo(null);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("seccao");
    });
  }
}
