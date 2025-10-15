import { test } from "@japa/runner";
import { FuncionarioOrgaoService } from "../../addons/modulo-webservice/@core/service/sigpq.service";


test.group("Sigpq listar funcionario orgao", (group) => {
  let funcionarioOrgaoService: FuncionarioOrgaoService;

  group.setup(async () => {
    funcionarioOrgaoService = new FuncionarioOrgaoService();
  });

  test("Verificar a tipagem do funcionarioOrgaoService", async ({ assert }) => {
    assert.typeOf(funcionarioOrgaoService, "object");
  });

  test("Verificar se o funcionarioOrgaoService é uma instância de BaseAxiosService", async ({
    assert,
  }) => {
    assert.instanceOf(funcionarioOrgaoService, FuncionarioOrgaoService);
  });

  test("Listar todos os funcionários de um órgão", async ({ assert }) => {
    const response = await funcionarioOrgaoService.listarTodos({search: "Jose"});
    assert.exists(response);
  });
});
