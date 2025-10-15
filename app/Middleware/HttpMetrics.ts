import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import client from 'prom-client'

// Criar um registro de métricas
const register = new client.Registry()

// Criar um contador de requisições HTTP
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Número total de requisições HTTP',
  labelNames: ['method', 'route', 'status'],
})

register.registerMetric(httpRequestCounter)
register.setDefaultLabels({ app: 'adonis-api' })
client.collectDefaultMetrics({ register })

export default class HttpMetrics {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // Executar a próxima ação do middleware
    await next()

    // Registrar a requisição HTTP
    httpRequestCounter.inc({
      method: request.method(),
      route: request.url(),
      status: response.response.statusCode,
    })
  }

  // Criar um método para expor métricas
  public async metrics({ response }: HttpContextContract) {
    response.header('Content-Type', register.contentType)
    response.send(await register.metrics())
  }
}
