import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

export default class extends BaseSeeder {
  public async run() {
    const existProvincia = await Database.from("provincias")
      .where({
        id: 5,
      })
      .first();

    if (!existProvincia) {
      await Database.from("provincias") 
        .where("id", 5)
        .update({
          nome: "Cubango",
          updated_at: new Date(),
        });
    }
  }
}
