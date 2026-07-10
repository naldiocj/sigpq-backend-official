import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";
import UserHelper from "App/Helper/UserHelper";
import Pessoa from "App/Models/Pessoa";
import Pessoafisica from "App/Models/Pessoafisica";
import Role from "App/Models/Role";
import User from "App/Models/User";
import UserRole from "App/Models/UserRole";

export default class extends BaseSeeder {
  private async removeUser(email: string) {
    const user = await User.findBy("email", email);
    if (!user) {
      console.log(`Usuário não encontrado: ${email}`);
      return;
    }

    const pessoaId = user.pessoa_id;

    await Database.from("sigpq_funcionario_orgaos")
      .where("pessoafisica_id", pessoaId)
      .delete();

    await Database.from("pessoajuridicas")
      .where("id", pessoaId)
      .delete();

    await Database.from("user_roles")
      .where("user_id", user.id)
      .delete();

    await Database.from("users")
      .where("id", user.id)
      .delete();

    await Database.from("pessoafisicas")
      .where("id", pessoaId)
      .delete();

    await Database.from("pessoas")
      .where("id", pessoaId)
      .delete();

    console.log(`Usuário removido: ${email}`);
  }

  private async createUser(
    role: Role,
    name: string,
    username: string,
    order: number,
    email: string,
    genero: string,
    hashedPassword: string
  ) {
    const existingPessoa = await Pessoa.findBy("nome_completo", name);
    let pessoa;

    if (!existingPessoa) {
      pessoa = await Pessoa.create({
        nome_completo: name,
        numero_ordem: order,
        tipo: "pf",
      });
    } else {
      pessoa = existingPessoa;
    }

    const pjData = {
      id: pessoa.id,
      sigla: name,
      pessoajuridica_id: null,
      tipo_pessoajuridica_id: 1,
      activo: 1,
      descricao: "Criado automaticamente pelo sistema.",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const existspjData = await Database.from("pessoajuridicas")
      .where("id", pessoa.id)
      .first();

    if (!existspjData) {
      console.log("Criando pessoajuridica para:", name);
      await Database.insertQuery().table("pessoajuridicas").insert(pjData);
    }

    const existingUser = await User.findBy("email", email);

    if (!existingUser) {
      const user = await User.create({
        username: username,
        email: email,
        aceder_painel_piips: role.name === "admin" ? 1 : 0,
        aceder_todos_agentes: role.name === "admin" ? 1 : 0,
        aceder_departamento: role.name === "admin" ? 1 : 0,
        aceder_seccao: role.name === "admin" ? 1 : 0,
        aceder_posto_policial: role.name === "admin" ? 1 : 0,
        password: hashedPassword,
        pessoa_id: pessoa.id,
        user_id: 1,
        descricao: "Criado automaticamente pelo sistema.",
      });
      await this.storeUser(user, role, pessoa, genero);
    } else {
      await this.storeUser(existingUser, role, pessoa, genero);
    }
  }

  private async storeUser(user: User, role: Role, pessoa: Pessoa, genero: string) {
    const existsPessoafisica = await Pessoafisica.find(pessoa.id);

    if (!existsPessoafisica) {
      await Pessoafisica.create({
        id: pessoa.id,
        apelido: "XXX",
        genero: genero,
        nome_pai: "XXX",
        nome_mae: "XXX",
        data_nascimento: new Date("2000-01-01"),
        nacionalidade_id: 1,
        estado_civil_id: 1,
        regime_id: 1,
      });
    }

    const existsUserRole = await Database.from("user_roles")
      .where("user_id", user.id)
      .where("role_id", role.id)
      .first();

    if (!existsUserRole) {
      await UserRole.create({
        user_id: user.id,
        role_id: role.id,
      });
    }

    const pessoaFisica = await Pessoafisica.find(pessoa.id);

    const orgData = {
      pessoajuridica_id: pessoa.id,
      pessoafisica_id: pessoaFisica!.id,
      numero_guia: "SGP-00" + Math.random() + "/2024",
      despacho: "-",
      despacho_data: new Date().toISOString().split("T")[0],
      situacao: "actual",
      user_id: user.id,
      nivel_colocacao: "muito-alto",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const existsOrgData = await Database.from("sigpq_funcionario_orgaos")
      .where("pessoafisica_id", pessoa.id)
      .first();

    if (!existsOrgData) {
      await Database.insertQuery()
        .table("sigpq_funcionario_orgaos")
        .insert(orgData);
    }
  }

  public async run() {
    const helper = new UserHelper();
    const hashedPassword = await helper.generatePasswordWithSalt("12345678");

    const emailsToRemove = [
      "simao.eduardo@sic.gov.ao",
      "miguel.xavier@sic.gov.ao",
      "madalena.dongoxi@sic.gov.ao",
      "octavia.calembe@sic.gov.ao",
    ];

    for (const email of emailsToRemove) {
      await this.removeUser(email);
    }

    const role = await Role.findBy("name", "admin");

    if (!role) {
      console.error("Role 'admin' não encontrada. Abortando seed.");
      return;
    }

    const usersToAdd = [
      { name: "Ludimilo Matoso", username: "ludimilo.matoso", order: 115, email: "ludimilo.matoso@sic.gov.ao", genero: "M" },
      { name: "Diamantino Simão", username: "diamantino.simao", order: 116, email: "diamantino.simao@sic.gov.ao", genero: "M" },
      { name: "Eduardo Bengue", username: "eduardo.bengue", order: 117, email: "eduardo.bengue@sic.gov.ao", genero: "M" },
      { name: "Augusto Bige", username: "augusto.bige", order: 118, email: "augusto.bige@sic.gov.ao", genero: "M" },
    ];

    for (const userData of usersToAdd) {
      await this.createUser(
        role,
        userData.name,
        userData.username,
        userData.order,
        userData.email,
        userData.genero,
        hashedPassword
      );
    }

    console.log("Seed modulo_sigpq_74_gerir_usuarios_sic concluído com sucesso.");
  }
}
