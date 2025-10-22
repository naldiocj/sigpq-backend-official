import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_funcionario_historico_saudes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("tipo_historico_saude", 50).notNullable();
      table.string("grau_parentesco", 255).notNullable();
      table.string("qual_historico_saude", 255).nullable();
      table.string("tempo_historico_saude").nullable();
      table
        .integer("funcionario_id")
        .unsigned()
        .references("id")
        .inTable("sigpq_funcionarios")
        .onDelete("RESTRICT");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime("created_at", { useTz: true });
      table.dateTime("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
