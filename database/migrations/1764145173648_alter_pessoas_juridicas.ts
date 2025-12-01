import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "pessoajuridicas";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string("orgao_comando_provincial", 255).alter();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum("orgao_comando_provincial", [
          "Comando Provincial",
          "Órgão", 
          "Departamento",
          "Unidade",
          "Secção",
          "Posto Policial",
          "Comando Municipal",
          "Esquadra",
          "Subunidade",
        ])
        .alter();
    });
  }
}
