import type { EventsList } from '@ioc:Adonis/Core/Event'
const LoggerRepository = require('App/Repositories/mongodb/LoggerRepository')

export default class LogEvento {
    public async registar(data: EventsList['logs:registar']) {
        await LoggerRepository.registar(data)
    }
}
