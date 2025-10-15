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
| new NotCreatedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotCreatedException extends HttpExceptionHandler {
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
    // console.log('Error > ', error.status)
    // console.log('Body > ', ctx.request.body())
    console.log('error : ', error);

    let sms = null
    if (this.#arrError) {
      sms = this.#arrError;
    }

    return ctx.response.badRequest({
      message: this.#message || 'Não foi possível criar um novo registo.',
      object: sms,
    })
  }
}
