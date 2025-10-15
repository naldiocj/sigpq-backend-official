import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "modulos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      // table
      //   .uuid('id')
      //   .primary()
      table.string("nome", 191).notNullable();
      table.string("sigla", 191).nullable().notNullable();
      table.string("cor", 191).nullable();
      table.string("img", 191).nullable();
      table.text("url").nullable();
      table.string("versao", 191).nullable();
      table.boolean("activo").defaultTo(true);
      table.string("descricao", 191).nullable();
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
