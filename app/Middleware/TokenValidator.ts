import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import jwt from 'jsonwebtoken';

export default class TokenValidator {
  public async handle(
    { request, response, auth }: HttpContextContract,
    next: () => Promise<void>
  ) {

    try {
      const authHeader = request.header('Authorization')

      if (!authHeader) {
        throw new AuthenticationException(
          'Token não fornecido',
          'E_MISSING_TOKEN'
        )
      }

      const token = authHeader.substring(7);
      const decoded = jwt.decode(token);

      if (!decoded.exp) {
        throw new AuthenticationException(
          'Token inválido',
          'E_INVALID_JWT_TOKEN'
        )
      }
  
      // Verifica se o token está próximo de expirar (30 minutos ou menos)
      const expirationTime = decoded.exp * 1000 // Converter para milissegundos
      const currentTime = Date.now()
      const timeToExpire = expirationTime - currentTime

      if (timeToExpire <= 0) {
        throw new AuthenticationException(
          'Token expirado',
          'E_JWT_TOKEN_EXPIRED'
        )
      }

      // Avisa se o token vai expirar em breve (30 minutos)
      if (timeToExpire <= 0 * 60 * 1000) {
        response.header('X-Token-Expiring-Soon', 'true')
        response.header('X-Token-Expires-In', Math.floor(timeToExpire / 1000).toString())
      }

      // Adiciona informações do token decodificado ao request para uso posterior
      request['tokenInfo'] = decoded

      const { user, orgao }: any = auth.use('jwt').payload

      if (!user) {
        return response.badRequest({
          message: 'Utilizador não está logado',
          object: null,
        });
      }

      if (!orgao) {
        return response.badRequest({
          message: 'Utilizador não está associado a um orgao',
          object: null,
        });
      }
      await next()
    } catch (error) {
      return response.status(401).json({
        message: error.message,
        code: error.code,
        object: null
      })
    }
  }
}