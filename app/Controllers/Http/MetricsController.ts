import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import client from 'prom-client'

// Criar um contador para requisições HTTP
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP recebidas',
  labelNames: ['method', 'route', 'status_code']
})

// Coletar métricas padrões
client.collectDefaultMetrics()

export default class MetricsController {
  public async index({ response }: HttpContextContract) {
    response.header('Content-Type', client.register.contentType)
    return response.send(await client.register.metrics())
  }
}
