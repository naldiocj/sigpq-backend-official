import { test } from '@japa/runner'
// import Role from 'App/Models/Role'
import RoleRepository from 'App/Repositories/RoleRepository'

test('Registar Utilizador', async ({ client }) => {
  console.log(client);

  // Entrada
  const roleId = {
    'user_id': 1,
    'modulo_id': 1,
    'nome': 'Teste',
    'name': 'Teste',
    'activo': true,
    'descricao': null
  }


  console.log(roleId)

  // Saida
  // const roleO = {
  //   'user_id': 1,
  //   'modulo_id': 1,
  //   'nome': 'Teste',
  //   'name': 'Teste',
  //   'activo': true,
  //   'descricao': null,
  //   'eliminado': true
  // }

  // const rep = new RoleRepository();
  // rep.store(roleI)
  // RoleRepository
  // product = product.toJSON()

  // const response = await client.post("/product").send(product).end();
  // console.log(await p.findById())

  // assert.isDefined(p)
  // assert.isDefined(2)
  // assert.isDefined(3)

  // const input: UtilizadorRegistarEntrada = {
  //   nomeCompleto: "Pedro Emanuel João Kondo",
  //   tipo: "PF",
  //   Utilizador: 1,
  //   activo: true,
  //   eliminado: false,
  //   nome: "Pedro Kondo",
  //   senha: "123456"
  // };

  // const output = {
  //   nomeCompleto: "Pedro Emanuel João Kondo",
  //   tipo: "PF",
  //   Utilizador: "1",
  //   activo: true,
  //   eliminado: false,
  //   nome: "Pedro Kondo",
  //   senha: "123456"
  // };

  // const userCase = new Utilizador()
  // const result = userCase.execute(input);
  // expect(user).toBeDefined();
  // console.log();

  // const response = await client.get('/')
  // console.log(response);

  // response.assertStatus(200)
  // response.assertBodyContains({ hello: 'hello world' })
})
