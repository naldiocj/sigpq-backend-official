import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PatenteRepository from "App/Repositories/PatenteRepository";
const removeTextNullVariable = require("App/@piips/shared/metodo-generico/RemoveTextNullVariable");

export default class PatenteController {
  #patenteRepo;
  constructor() {
    this.#patenteRepo = new PatenteRepository();
  }

  public async index({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const options = {
      page: request.input("page") || null,
      perPage: request.input("perPage") || null,
      search: request.input("search") || null,
      searchBy: request.input("searchBy") || null,
      orderBy: request.input("orderBy") || null,
      orderByAscOrDesc: request.input("orderByAscOrDesc") || 'asc',
      classe: request.input('classe') || null,
      classeId: request.input('sigpq_tipo_carreira_id'),
      tecnico: request.input('tecnico'),
      regime_id: request.input('regime_id')
      // patente_em_tempo_id: request.input('patente_em_tempo_id') || null


    }


    const result: any = await this.#patenteRepo.listarTodos(removeTextNullVariable(options))
    return response.ok({
      message: null,
      object: result,
    });
  }
}
