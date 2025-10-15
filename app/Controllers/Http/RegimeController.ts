import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegimeRepository from "App/Repositories/RegimeRepository";

export default class RegimeController {
  #regimeRepo: any;

  constructor() {
    this.#regimeRepo = new RegimeRepository();
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
      orderByAscOrDesc: request.input("orderByAscOrDesc") || "asc",
    };

    const result = await this.#regimeRepo.findAll(options);

    return response.ok({
      message: null,
      object: result,
    });
  }
}
