import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { gerarLogs } from 'App/@piips/shared/metodo-generico/Gerar-Logs'
import MongoLogService from 'App/Service/MongoLogService'
import { LogRules } from 'Config/logRules'

export default class HttpLog {
  public async handle({ request, response, auth }: HttpContextContract, next: () => Promise<void>) {
    const url = request.url()
    const method = request.method()
    const ip = request.ip()
    const qs = request.qs()
    const pathname = url.split('?')[0]

    // Ignorar rotas por prefixo
    if (LogRules.skipPrefixes.some(prefix => url.startsWith(prefix))) {
      return await next()
    }

    // Se tiver "search"
    const searchParam = qs.search
    const hasSearch = typeof searchParam === 'string'
    const matchedSearchRule = Object.entries(LogRules.skipQuerySearchBelow).find(([route]) =>
      pathname.includes(route)
    )

    if (hasSearch) {
      // Rota não está na whitelist → ignora log
      if (!matchedSearchRule) return await next()
      const [_, minLength] = matchedSearchRule
      if (searchParam.length < minLength) return await next()
    }

    const start = process.hrtime()
    await next()
    const end = process.hrtime(start)

    const logTime = (end[0] * 1000 + end[1] / 1e6).toFixed(2)
    const logMessage = `[${new Date().toISOString()}] ${request.method()} ${request.url()} - ${response.response.statusCode} (${logTime} ms)`
    //Logger.info(logMessage)

    try {

      if (request.method() === 'GET') {
        //Filtar rota e tirar modulo
        const match = url.match(/\/v1\/([^\/]+)/);
        const moduleName = match ? match[1] : null;

        const logData = {
          tipoOperacao: 'VISUALIZOU',
          dataHoraOperacao: new Date(),
          valorAntigo: null,
          valorNovo: null,
          modulo: moduleName,
          rota: `${request.method()}: ${request.url()}`,
          ipOrigem: request.ip(),
          statusCode: response.response.statusCode,
          duracaoMs: parseFloat(logTime),
          userAgent: request.header('user-agent'),
          user: {
            id: auth?.user?.id || null,
            nome: auth?.user?.username || null,
            email: auth?.user?.email || null,
          },
        }

        //await MongoLogService.log(logData)
        void MongoLogService.log(logData).catch((err) => {
          console.warn("⚠️ [MongoDB] Erro ao tentar registrar log:", err.message || err)
        })
      }
    } catch (err) {
      // Silencia erros de log
      console.warn("⚠️ [MongoDB] Erro ao tentar registrar log:", err.message || err);
    }
  }
}
