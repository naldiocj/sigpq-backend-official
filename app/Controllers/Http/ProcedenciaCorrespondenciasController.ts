import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ProcedenciaRepository } from 'App/Repositories/ProcedenciaCorrespondenciaRepository'

export default class ProcedenciaCorrespondenciasController {
  #estadoCivilRepo:ProcedenciaRepository

    constructor() {
        this.#estadoCivilRepo = new ProcedenciaRepository()
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

        const result = await this.#estadoCivilRepo.listarTodos(options)

        return response.ok({
            message: null,
            object: result,
        });
    }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  
  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
