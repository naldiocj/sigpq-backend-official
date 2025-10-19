import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionario_orgaos";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("brigada_anterior").defaultTo(null);
      table.string("seccao_anterior").defaultTo(null);
      table.string("brigada").defaultTo(null);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("brigada_anterior");
      table.dropColumn("seccao_anterior");
      table.dropColumn("seccao_anterior");
    });
  }
}
