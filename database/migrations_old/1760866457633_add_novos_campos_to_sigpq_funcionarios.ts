import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionarios";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("motivo_situacao_laboral").defaultTo(null);
      table.string("linguas_internacionais").defaultTo(null);
      table.string("linguas_nacionais").defaultTo(null);
      table.string("numero_calcado").defaultTo(null);
      table.string("numero_camisa").defaultTo(null);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("motivo_situacao_laboral");
      table.dropColumn("linguas_internacionais");
      table.dropColumn("linguas_nacionais");
      table.dropColumn("numero_calcado");
      table.dropColumn("numero_camisa");
    });
  }
}
