import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import PaisRepository from "App/Repositories/PaisRepository";
export default class PaisController {
  #paisRepo: any;

  constructor() {
    this.#paisRepo = new PaisRepository();
  }

  public async index({ request, response }: HttpContextContract) {
    const options = {
      page: request.input("page") || null,
      perPage: request.input("perPage") || null,
      search: request.input("search") || null,
      searchBy: request.input("searchBy") || null,
      orderBy: request.input("orderBy") || null,
      orderByAscOrDesc: request.input("orderByAscOrDesc") || "asc",
    };

    const result = await this.#paisRepo.findAll(options);

    return response.ok({
      message: null,
      object: result,
    });
  }

  public async show({ params, response }) {
    const result = await this.#paisRepo.findById(params.id);
    return response.ok({
      message: null,
      object: result,
    });
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const input = request.all();
    input.user_id = auth.user?.id;

    const result = await this.#paisRepo.store(input);

    return response.ok({
      message: "Sucesso ao registar!",
      object: result,
    });
  }

  public async update({
    auth,
    params,
    request,
    response,
  }: HttpContextContract) {
    const input = request.all();
    input.user_id = auth.user?.id;

    const result = await this.#paisRepo.update(params.id, input);

    return response.ok({
      message: "Sucesso ao actualizar!",
      object: result,
    });
  }

  public async delete({ auth, params, response }: HttpContextContract) {
    const result = await this.#paisRepo.delete(params.id, auth.user?.id);
    return response.ok({
      message: "Sucesso ao eliminar!",
      object: result,
    });
  }
}
