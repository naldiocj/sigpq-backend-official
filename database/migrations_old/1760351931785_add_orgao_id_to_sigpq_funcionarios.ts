import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionarios";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("tipo_estrutura_organica_id")
        .unsigned()
        .references("id")
        .inTable("tipo_estrutura_organicas")
        .onDelete("RESTRICT")
        .nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("tipo_estrutura_organica_id");
      table.dropForeign("tipo_estrutura_organica_id");
    });
  }
}
