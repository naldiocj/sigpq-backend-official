import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserRepository from "App/Repositories/UserRepository";

export default class UserController {
  #userRepo: any;

  constructor() {
    this.#userRepo = new UserRepository();
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

    const result = await this.#userRepo.findAll(options);

    return response.ok({
      message: null,
      object: result,
    });
  }

  public async show({ params, response }) {
    const user = await this.#userRepo.findUser(params.id);
    return response.ok({
      message: null,
      object: user,
    });
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const input = request.all();
    input.user_id = auth.user?.id;

    const user = await this.#userRepo.store(input);

    return response.ok({
      message: "Sucesso ao registar!",
      object: user,
    });
  }

  public async update({ auth, params, request, response }) {
    const input = request.all();
    input.user_id = auth.user?.id;
    console.log("Acessou a parte de atualizar")
    const user = await this.#userRepo.update(params.id, input);

    return response.ok({
      message: "Sucesso ao actualizar!",
      object: user,
    });
  }

  public async delete({ auth, params, response }: HttpContextContract) {
    const user_id = auth.user?.id;
    const result = await this.#userRepo.delete(params.id, user_id);
    return response.ok({
      message: "Sucesso ao eliminar!",
      object: result.user,
    });
  }

  public async perfil() {
    // let user = await this.#userRepo.findAll()
    // return response.ok(user)
  }
}
