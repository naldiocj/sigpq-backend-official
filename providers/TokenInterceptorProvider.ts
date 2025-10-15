import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class TokenInterceptorProvider {
  constructor(protected app: ApplicationContract) {}

  public static needsApplication = true

  public register() {}

  public async boot() {
    const HttpContext = this.app.container.use('Adonis/Core/HttpContext')

    HttpContext.getter(
      'token',
      function () {
        const authHeader = this.request.header('Authorization')
        if (!authHeader) {
          return null
        }
        return authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader
      },
      true
    )
  }
}