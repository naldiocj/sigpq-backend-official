import { test } from "@japa/runner";
import RegistarRepository from "../../addons/modulo-sigpq/src/funcionario-excepcao/repositories/registar-repository";



test("Registar Funcionario Em Excepcao ", async () => {
  let repository: RegistarRepository = new RegistarRepository();

 await repository.execute({ user_id: 1, sigpq_funcionario_id: 129633 });
});
