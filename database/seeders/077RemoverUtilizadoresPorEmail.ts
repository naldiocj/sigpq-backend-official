import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  private emails: string[] = [
    "eduardo.bengue@sic.gov.ao",
    "miguel.xavier@sic.gov.ao",
    "madalena.dongoxi@sic.gov.ao",
    "jose.paulino@sic.gov.ao",
    "octavia.calembe@sic.gov.ao",
    "franklim.bravo@sic.gov.ao",
    "liudmilo.batista@sic.gov.ao",
    "ludimilo.matoso@sic.gov.ao",
    "diamantino.simao@sic.gov.ao",
    "yuri.pegado@sic.gov.ao",
    "augusto.bige@sic.gov.ao",
  ];

  public async run() {
    const trx = await Database.transaction();

    try {
      const users = await Database.from("users")
        .useTransaction(trx)
        .whereIn("email", this.emails);

      const userIds = users.map((u: any) => u.id);
      const pessoaIds = users.map((u: any) => u.pessoa_id).filter(Boolean);

      if (users.length > 0) {
        console.log(
          `Utilizadores encontrados na tabela users: ${users
            .map((u: any) => `#${u.id} (${u.email})`)
            .join(", ")}`
        );
      } else {
        console.log("Nenhum utilizador encontrado na tabela users.");
        await trx.rollback();
        return;
      }

      const pessoasFisicasIds: number[] = (
        await Database.from("pessoafisicas")
          .useTransaction(trx)
          .whereIn("id", pessoaIds)
          .select("id")
      ).map((r: any) => r.id);

      const funcIds: number[] = (
        await Database.from("sigpq_funcionarios")
          .useTransaction(trx)
          .whereIn("id", pessoaIds)
          .select("id")
      ).map((r: any) => r.id);

      // Delete FK references using explicit columns (safe order with FK checks on)
      const deletasPessoas = [
        { tabela: "sigpq_habilitacaoliterarias", idCol: "pessoafisica_id" },
        { tabela: "sigpq_provimentos", idCol: "pessoa_id" },
        { tabela: "sigpq_cargos", idCol: "pessoafisica_id" },
        { tabela: "sigpq_funcaos", idCol: "pessoafisica_id" },
        { tabela: "sigpq_carreiras", idCol: "pessoafisica_id" },
        { tabela: "sigpq_cursos", idCol: "pessoafisica_id" },
        { tabela: "sigpq_funcionario_orgaos", idCol: "pessoafisica_id" },
        { tabela: "sigpq_enderecos", idCol: "pessoa_id" },
        { tabela: "sigpq_contactos", idCol: "pessoa_id" },
        { tabela: "sigpq_documentos", idCol: "pessoafisica_id" },
        { tabela: "sigpq_funcionario_estados", idCol: "pessoafisica_id" },
        { tabela: "sigpq_passes_funcionarios", idCol: "sigpq_funcionario_id" },
        { tabela: "sigpq_funcionarios", idCol: "id" },
      ];

      for (const item of deletasPessoas) {
        const removidos = await Database.from(item.tabela)
          .useTransaction(trx)
          .whereIn(item.idCol, item.idCol === "id" ? funcIds : pessoaIds)
          .delete();
        console.log(`${item.tabela}: ${removidos} registo(s) removido(s)`);
      }

      // Disable FK checks to handle circular FKs and unknown references
      await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 0").useTransaction(trx);
      console.log("FK checks desactivados");

      // Null circular FKs
      await Database.from("pessoas")
        .useTransaction(trx)
        .whereIn("user_id", userIds)
        .update({ user_id: null });
      console.log(`pessoas.user_id: ${userIds.length} referencias anuladas`);

      await Database.from("users")
        .useTransaction(trx)
        .whereIn("pessoa_id", pessoaIds)
        .update({ pessoa_id: null });
      console.log(`users.pessoa_id: ${pessoaIds.length} referencias anuladas`);

      // Delete logs (anonimize)
      await Database.from("logs")
        .useTransaction(trx)
        .whereIn("user_id", userIds)
        .update({ user_id: null });
      console.log(`logs: ${userIds.length} utilizador(es) anoninizado(s)`);

      // Delete user-side records
      const deletasUsers = [
        { tabela: "user_roles", idCol: "user_id" },
        { tabela: "jwt_tokens", idCol: "user_id" },
        { tabela: "user_permissions", idCol: "user_id" },
        { tabela: "users", idCol: "id" },
      ];

      for (const item of deletasUsers) {
        const removidos = await Database.from(item.tabela)
          .useTransaction(trx)
          .whereIn(item.idCol, userIds)
          .delete();
        console.log(`${item.tabela}: ${removidos} registo(s) removido(s)`);
      }

      // Delete pessoa-side records
      const deletasEntidades = [
        "pessoafisicas",
        "pessoajuridicas",
        "pessoas",
      ];

      for (const tabela of deletasEntidades) {
        const removidos = await Database.from(tabela)
          .useTransaction(trx)
          .whereIn("id", pessoaIds)
          .delete();
        console.log(`${tabela}: ${removidos} registo(s) removido(s)`);
      }

      // Re-enable FK checks
      await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 1").useTransaction(trx);
      console.log("FK checks reactivados");

      await trx.commit();
      console.log(
        `Utilizadores (${this.emails.join(", ")}) removidos com sucesso.`
      );
    } catch (error) {
      await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 1").useTransaction(trx);
      await trx.rollback();
      console.error("Erro ao remover os utilizadores:", error);
      throw error;
    }
  }
}
