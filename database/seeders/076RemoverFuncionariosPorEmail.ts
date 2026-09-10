import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    const emails: string[] = [
      "simao.eduardo@sic.gov.ao",
      "miguel.xavier@sic.gov.ao",
      "madalena.dongoxi@sic.gov.ao",
      "jose.paulino@sic.gov.ao",
      "octavia.calembe@sic.gov.ao",
      "franklim.bravo@sic.gov.ao",
      "liudmilo.batista@sic.gov.ao",
    ];

    const trx = await Database.transaction();

    try {
      const users = await Database.from("users")
        .useTransaction(trx)
        .whereIn("email", emails);

      if (users.length === 0) {
        console.log("Nenhum utilizador encontrado com os emails informados.");
        await trx.rollback();
        return;
      }

      const userIds = users.map((u: any) => u.id);
      const pessoaIds = users.map((u: any) => u.pessoa_id).filter(Boolean);

      console.log(
        `Utilizadores encontrados: ${users
          .map((u: any) => `#${u.id} (${u.email})`)
          .join(", ")}`
      );

      const funcionarios = await Database.from("sigpq_funcionarios")
        .useTransaction(trx)
        .whereIn("id", pessoaIds);

      if (funcionarios.length > 0) {
        const funcIds = funcionarios.map((f: any) => f.id);
        console.log(
          `Funcionários encontrados: ${funcionarios
            .map((f: any) => `#${f.id} (${f.numero_agente ?? f.nip ?? "sem número"})`)
            .join(", ")}`
        );

        const relacoesFuncionarios = [
          { tabela: "sigpq_habilitacaoliterarias", coluna: "pessoafisica_id" },
          { tabela: "sigpq_provimentos", coluna: "pessoa_id" },
          { tabela: "sigpq_cargos", coluna: "pessoafisica_id" },
          { tabela: "sigpq_funcaos", coluna: "pessoafisica_id" },
          { tabela: "sigpq_carreiras", coluna: "pessoafisica_id" },
          { tabela: "sigpq_cursos", coluna: "pessoafisica_id" },
          { tabela: "sigpq_funcionario_estados", coluna: "pessoafisica_id" },
          { tabela: "sigpq_funcionario_orgaos", coluna: "pessoafisica_id" },
          { tabela: "sigpq_enderecos", coluna: "pessoa_id" },
          { tabela: "sigpq_contactos", coluna: "pessoa_id" },
          { tabela: "sigpq_passes_funcionarios", coluna: "sigpq_funcionario_id" },
          { tabela: "sigpq_documentos", coluna: "pessoafisica_id" },
          { tabela: "sigpq_funcionarios", coluna: "id" },
        ];

        for (const relacao of relacoesFuncionarios) {
          const removidos = await Database.from(relacao.tabela)
            .useTransaction(trx)
            .whereIn(relacao.coluna, funcIds)
            .delete();
          console.log(`${relacao.tabela}: ${removidos} registo(s) removido(s)`);
        }
      } else {
        console.log("Nenhum funcionário vinculado aos utilizadores encontrados.");
      }

      const relacoesUtilizadores = [
        { tabela: "user_roles", coluna: "user_id" },
        { tabela: "jwt_tokens", coluna: "user_id" },
        { tabela: "logs", coluna: "user_id" },
        { tabela: "users", coluna: "id" },
      ];

      for (const relacao of relacoesUtilizadores) {
        const removidos = await Database.from(relacao.tabela)
          .useTransaction(trx)
          .whereIn(relacao.coluna, userIds)
          .delete();
        console.log(`${relacao.tabela}: ${removidos} registo(s) removido(s)`);
      }

      const relacoesPessoas = [
        { tabela: "pessoafisicas", coluna: "id" },
        { tabela: "pessoajuridicas", coluna: "id" },
        { tabela: "pessoas", coluna: "id" },
      ];

      for (const relacao of relacoesPessoas) {
        const removidos = await Database.from(relacao.tabela)
          .useTransaction(trx)
          .whereIn(relacao.coluna, pessoaIds)
          .delete();
        console.log(`${relacao.tabela}: ${removidos} registo(s) removido(s)`);
      }

      await trx.commit();
      console.log(
        `Utilizadores e funcionários (${emails.join(", ")}) removidos com sucesso.`
      );
    } catch (error) {
      await trx.rollback();
      console.error("Erro ao remover os utilizadores/funcionários:", error);
      throw error;
    }
  }
}
