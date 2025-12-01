import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

export default class extends BaseSeeder {
  public async run() {
    await Database.from("pessoajuridicas").update({
      orgao_comando_provincial: "Órgão",
      w
    });
  }
}
