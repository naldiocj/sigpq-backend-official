import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Pessoa from "App/Models/Pessoa";
import Pessoafisica from "App/Models/Pessoafisica";
import Role from "App/Models/Role";
import User from "App/Models/User";
import UserRole from "App/Models/UserRole";
import Database from "@ioc:Adonis/Lucid/Database";

export default class extends BaseSeeder {
  /**
   * Função auxiliar para criar uma Pessoa, PessoaJuridica, User, PessoaFisica e UserRole.
   * A checagem de existência é feita primeiramente pela Pessoa (nome_completo) e,
   * em seguida, pelo Usuário (email).
   */
  private async createRHUser(
    role: Role,
    name: string,
    order: number,
    email: string,
    despacho: string
  ) {
    // 1. Verificar se a Pessoa (RHx) já existe pelo nome
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

    // 3. Inserir registro na tabela 'pessoajuridicas' (mantido o padrão do código original)
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

    // 4. Verificar e Criar Usuário (User)
    const existingUser = await User.findBy("email", email);

    if (!existingUser) {
      const user = await User.create({
        username: `Recursos Humanos ${name.slice(-1)}`, // Ex: Recursos Humanos 1
        email: email,
        password: "12345678",
        pessoa_id: pessoa.id,
        user_id: 2, // Manter o FK user_id original (se for para uma auditoria ou user criador)
        descricao: "Criado automaticamente pelo sistema.",
      });
      await storeUser(user);
    } else {
      await storeUser(existingUser);
    }

    async function storeUser(user: User) {
      const existsPessoafisica = await Pessoafisica.find(pessoa.id);

      let pessoaFisica;

      if (!existsPessoafisica) {
        pessoaFisica = await Pessoafisica.create({
          id: pessoa.id, // ID deve ser o mesmo da Pessoa
          apelido: name,
          genero: "M",
          nome_pai: "Recursos Humanos - M",
          nome_mae: "Recursos Humanos - F",
          data_nascimento: new Date("2000-01-01"),
          nacionalidade_id: 1,
          estado_civil_id: 1,
          regime_id: 1,
        });
      } else {
        pessoaFisica = existsPessoafisica;
      }

      // 6. Associar o papel (Role) ao Usuário
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

      // 7. Inserir registro na tabela 'sigpq_funcionario_orgaos'
      const orgData = {
        pessoajuridica_id: pjData.id,
        pessoafisica_id: pessoaFisica.id,
        numero_guia: "SGP-00" + Math.random() + "/2024",
        despacho: despacho,
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
  }

  public async run() {
    // 1. Buscar a Role 'operador' uma única vez
    const role = await Role.findBy("name", "admin");

    if (!role) {
      console.error("Role 'operador' não encontrada. Abortando seed.");
      return;
    }

    // 2. Criação do RH1
    await this.createRHUser(role, "RH1", 101, "rh1@sic.gov.ao", "144/2025");

    // 3. Criação do RH2
    await this.createRHUser(
      role,
      "RH2",
      107,
      "rh2@sic.gov.ao", // Corrigido o email de checagem/criação
      "145/2025"
    );
  }
}
