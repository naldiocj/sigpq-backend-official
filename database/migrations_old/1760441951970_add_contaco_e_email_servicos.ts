import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionarios";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("email_servico").defaultTo(null);
      table.string("contacto_servico").defaultTo(null);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("email_servico");
      table.dropColumn("contacto_servico");
    });
  }
}
