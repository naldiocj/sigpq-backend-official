import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'  
import EstadoCivilRepository from 'App/Repositories/EstadoCivilRepository'

export default class EstadoCivilController {

    #estadoCivilRepo: any

    constructor() {
        this.#estadoCivilRepo = new EstadoCivilRepository()
    }

    public async index({ request, response }: HttpContextContract): Promise<void> {

        const options = {
            page: request.input("page") || null,
            perPage: request.input("perPage") || null,
            search: request.input("search") || null,
            searchBy: request.input("searchBy") || null,
            orderBy: request.input("orderBy") || null,
            orderByAscOrDesc: request.input("orderByAscOrDesc") || 'asc'
        }

        const result = await this.#estadoCivilRepo.findAll(options)

        return response.ok({
            message: null,
            object: result,
        });
    }
}
