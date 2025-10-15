import type { EventsList } from '@ioc:Adonis/Core/Event'
const LoggerRepository = require('App/Repositories/mongodb/LoggerRepository')

export default class AgenteEvento {

    public async listar(data: EventsList['agente:listar']) {
        await LoggerRepository.registar({
            user: 'Object',
            event: 'String',
            auditable_id: 'Number',
            auditable: 'Object',
            ip: 'String',
            message: 'String',
            success: 'Boolean',
            url: 'String',
            old_data: 'Object',
            new_data: 'Object',
            method: 'String',
            created_at: 'Date',
            city: 'String',
            isp: 'String',
            country: 'String',
            as: 'String',
        })
    }

    public async registar(data: EventsList['agente:registar']) {
        // send email to the new user
        // await LoggerRepository.register({
        //     user: 'Pedro Kondo'
        // })
    }

}
