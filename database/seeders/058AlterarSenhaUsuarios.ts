import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";
import UserHelper from "App/Helper/UserHelper";

export default class extends BaseSeeder {
  public async run() {
    const helper = new UserHelper();
    const hashedPassword = await helper.generatePasswordWithSalt("12345678");

    const emails = [
      "teresa.catate@sic.gov.ao",
      "simao.eduardo@sic.gov.ao",
      "miguel.xavier@sic.gov.ao",
      "edilson.miguel@sic.gov.ao",
      "madalena.dongoxi@sic.gov.ao",
      "jose.paulino@sic.gov.ao",
      "octavia.calembe@sic.gov.ao",
      "yuri.pegado@sic.gov.ao",
      "suporte.dtti@sic.gov.ao",
      "liudmilo.batista@sic.gov.ao",
    ];

    for (const email of emails) {
      const result = await Database.from("users").where("email", email).update({ password: hashedPassword });
      if (result) {
        console.log(`Senha alterada para: ${email}`);
      } else {
        console.log(`Usuário não encontrado: ${email}`);
      }
    }
  }
}
