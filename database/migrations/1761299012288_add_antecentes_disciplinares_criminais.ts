import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "sigpq_antecentes_disciplinares_criminais";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("numero_processo", 255).defaultTo("");
      table.string("referencia", 255).defaultTo("N/A");
      table.string("ofendido", 255).defaultTo("N/A");
      table.string("anexo", 255).defaultTo("N/A");
      table.string("descricao", 255).defaultTo("N/A");
      table
        .integer("pessoa_id")
        .unsigned()
        .references("id")
        .inTable("pessoas")
        .onDelete("RESTRICT");

      table
        .integer("funcionario_id")
        .unsigned()
        .references("id")
        .inTable("sigpq_funcionarios")
        .onDelete("RESTRICT");

      table.boolean("activo").defaultTo(true);
      table.boolean("eliminado").defaultTo(false);
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
