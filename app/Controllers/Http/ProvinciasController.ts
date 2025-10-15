import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ProvinciaRepository from "App/Repositories/ProvinciaRepository";
export default class ProvinciasController {
  #provinciaRepo: ProvinciaRepository;

  constructor() {
    this.#provinciaRepo = new ProvinciaRepository();
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

    const result = await this.#provinciaRepo.listarTodos(options);

    return response.ok({
      message: null,
      object: result,
    });
  }

  public async show({ params, response }) {
    const result = await this.#provinciaRepo.findById(params.id);
    return response.ok({
      message: null,
      object: result,
    });
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const input = request.all();
    input.user_id = auth.user?.id;

    const result = await this.#provinciaRepo.registar(input);

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

    const result = await this.#provinciaRepo.editar(input, params.id, null);

    if (result instanceof Error) {
      return response.badGateway({
        message: result.message,
        object: null
      })
    }

    return response.ok({
      message: "Sucesso ao actualizar!",
      object: result,
    });
  }

  public async delete({ auth, params, response }: HttpContextContract) {
    const result = await this.#provinciaRepo.delete(params.id, auth.user?.id);
    return response.ok({
      message: "Sucesso ao eliminar!",
      object: result,
    });
  }


}
