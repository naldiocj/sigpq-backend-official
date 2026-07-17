import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RemovePessoasPessoasJuridicasSeeder extends BaseSeeder {
  public async run() {
    const ids = [161, 163, 167, 169];

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 0");

    await Database.transaction(async (trx) => {
      for (const id of ids) {
        const pessoa = await trx.from("pessoas").where("id", id).first();
        if (!pessoa) {
          console.log(`[SKIP] ID ${id} — pessoa não encontrada.`);
          continue;
        }

        await trx.from("pessoajuridicas").where("id", id).delete();
        await trx.from("pessoas").where("id", id).delete();
        console.log(`[REMOVED] ID ${id}`);
      }
    });

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 1");

    console.log("Seed 072: Pessoas e pessoas jurídicas removidas com sucesso.");
  }
}
