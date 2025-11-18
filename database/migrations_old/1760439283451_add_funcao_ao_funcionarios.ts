import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionarios";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("tipo_cargo_id")
        .unsigned()
        .references("id")
        .inTable("sigpq_tipo_cargos")
        .onDelete("RESTRICT")
        .nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("tipo_cargo_id");
      table.dropForeign("tipo_cargo_id");
    });
  }
}
