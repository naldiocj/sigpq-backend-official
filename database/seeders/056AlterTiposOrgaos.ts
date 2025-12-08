import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

export default class extends BaseSeeder {
  public async run() {
    await Database.from("tipo_estrutura_organicas")
    .where('id', 4)
    .update({
      name: "Orgãos Centrais"
    });

    await Database.from("tipo_estrutura_organicas")
    .where('id', 5)
    .update({
      name: "Orgãos Provínciais"
    });
  }
}
