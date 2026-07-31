import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

export default class extends BaseSeeder {
  public async run() {
    const ids: number[] = [217, 224];

    const trx = await Database.transaction();

    try {
      const funcionarios = await Database.from("sigpq_funcionarios")
        .useTransaction(trx)
        .whereIn("id", ids);

      if (funcionarios.length === 0) {
        console.log("Nenhum funcionário encontrado com os ids 217 e 224.");
        await trx.rollback();
        return;
      }

      console.log(
        `Funcionários encontrados: ${funcionarios
          .map((f: any) => `#${f.id} (${f.numero_agente ?? f.nip ?? "sem número"})`)
          .join(", ")}`
      );

      const relacoes = [
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
        { tabela: "pessoafisicas", coluna: "id" },
        { tabela: "pessoas", coluna: "id" },
      ];

      for (const relacao of relacoes) {
        const removidos = await Database.from(relacao.tabela)
          .useTransaction(trx)
          .whereIn(relacao.coluna, ids)
          .delete();

        console.log(`${relacao.tabela}: ${removidos} registo(s) removido(s)`);
      }

      await trx.commit();
      console.log("Funcionários 217 e 224 removidos com sucesso.");
    } catch (error) {
      await trx.rollback();
      console.error("Erro ao remover os funcionários:", error);
      throw error;
    }
  }
}
