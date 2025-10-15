import { test } from '@japa/runner'
// import Utilizador from 'App/Domain/Entity/Utilizador'
// import { UtilizadorRegistarEntrada } from 'App/Domain/UseCase/Utilizador/dto'
// import Pai from 'App/Models/Pai'
// import UtilizadorRepository from 'App/Repositories/UtilizadorRepository'
// import PaisRepositorio from 'App/Repositories/PaisRepositorio'

test('Registar Utilizador', async ({ assert, client }) => {
  console.log('assert : ', assert ,' - ', client);
  // const p = new PaisRepositorio()

  // product = product.toJSON()

  // const response = await client.post("/product").send(product).end();
  // console.log(await p.findById())

  // assert.isDefined(1)
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
