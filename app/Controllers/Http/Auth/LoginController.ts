// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { gerarLogs } from 'App/@piips/shared/metodo-generico/Gerar-Logs'
import AuthRepository from 'App/Repositories/auth/AuthRepository'
export default class LoginController {
  #authRepo
  constructor() {
    this.#authRepo = new AuthRepository()
  }

  /**
   * @autor 'pedrokondo20@gmail.com'
  */
  public async authenticate({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])
    const tokenObject = await this.#authRepo.login(email, password, auth)



    if (tokenObject instanceof Error) {
      //Armazenar no log quando o utilizador entra no sistema
      await gerarLogs({
        request,
        response,
        auth,
        tipoOperacao: 'ACESSOU',
        valorNovo: { email },
        descricao: 'ULTILIZADOR FALHOU ACESSAR COM SUCESSO',
      })

      return response.badRequest({
        message: tokenObject.message,
        object: null,
      });
    } else {
      //Armazenar no log quando o utilizador entra no sistema
      await gerarLogs({
        request,
        response,
        auth,
        tipoOperacao: 'ACESSOU',
        valorNovo: { email },
        descricao: 'ULTILIZADOR LOGOU COM SUCESSO',
      })
      // this.logger.dispash({
      //   user: (await auth.getUser()).toJSON(),
      //   auditable: "Utilizador",
      //   event: "Utilizador registado",
      //   request,
      //   data: {
      //     result
      //   },
      //   message: "Utilizador registado com sucesso!",
      // });
    }

    return response.ok({
      message: 'Sucesso ao entrar',
      object: tokenObject,
    })
  }

  /**
   * @autor 'pedrokondo20@gmail.com'
   * async logout
   */
  public async logout({ response, auth }): Promise<any> {

    // const tokenObject = await this.#authRepo.logout(auth)
    await this.#authRepo.logout(auth)

    return response.ok({
      message: 'Sair do sistema',
      object: null,
    })
  }
}
