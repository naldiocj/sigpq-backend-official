import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ModuloRepository from 'App/Repositories/ModuloRepository'
export default class ModulosController {

    #moduleRepo: any

    constructor() {
        this.#moduleRepo = new ModuloRepository()
    }

    public async index({ request, response }: HttpContextContract) {

        const options = {
            page: request.input("page") || null,
            perPage: request.input("perPage") || null,
            search: request.input("search") || null,
            searchBy: request.input("searchBy") || null,
            orderBy: request.input("orderBy") || null,
            orderByAscOrDesc: request.input("orderByAscOrDesc") || 'asc'
        }

        const result = await this.#moduleRepo.findAll(options)

        return response.ok({
            message: null,
            object: result,
        });
    }

    public async show({ params, response }) {
        const result = await this.#moduleRepo.findById(params.id)
        return response.ok({
            message: null,
            object: result,
        });
    }

    public async store({ auth, request, response }: HttpContextContract) {

        const input = request.all();
        input.user_id = auth.user?.id;

        const result = await this.#moduleRepo.store(input);

        return response.ok({
            message: "Sucesso ao registar!",
            object: result,
        });
    }

    public async update({ auth, params, request, response }: HttpContextContract) {

        const input = request.all();
        input.user_id = auth.user?.id;

        const result = await this.#moduleRepo.update(params.id, input)

        return response.ok({
            message: "Sucesso ao actualizar!",
            object: result,
        });
    }

    public async delete({ auth, params, response }: HttpContextContract) {

        const result = await this.#moduleRepo.delete(params.id, auth.user?.id)
        return response.ok({
            message: "Sucesso ao eliminar!",
            object: result,
        });
    }
}
