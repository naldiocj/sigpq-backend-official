
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new NotFoundException('message', 404, 'E_NOT_FOUND')
|
*/
export default class NotFoundException extends HttpExceptionHandler {
  #message?: any
  #arrError?: any
  constructor(message?: any, arrError?: any) {
    super(Logger)
    this.#message = message
    this.#arrError = arrError
  }
  /**
   * Handle this exception by itself
   */
  public async handle(error: any, ctx: HttpContextContract) {
    console.log('error : ', error);

    let sms = null
    if (this.#arrError) {
      sms = this.#arrError;
    }

    return ctx.response.notFound({
      message: this.#message || 'Não encontrou o registo.',
      object: sms,
    })
  }
}
