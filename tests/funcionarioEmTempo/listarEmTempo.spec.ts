import { test } from "@japa/runner";
import ListarPorPessoaRepository from "../../addons/modulo-sigpq/src/funcionario-excepcao/repositories/listar-por-pessoa-repository";

test("Listar Funcionario em Tempo", async () => {
  let repository: ListarPorPessoaRepository = new ListarPorPessoaRepository();

  const emTempo = await repository.execute(60, false);
  console.log(emTempo);
});
