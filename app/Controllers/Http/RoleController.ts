import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RoleRepository from "App/Repositories/RoleRepository";
// import RoleUseCase from 'App/Domain/UseCase/RoleUseCase/index'
// import rolesitory from 'App/Repositories/rolesitory'

const removeTextNullVariable = require("App/@piips/shared/metodo-generico/RemoveTextNullVariable");

export default class RoleController {
  #role: any;

  constructor() {
    this.#role = new RoleRepository();
  }

  public async index({ request, response }: HttpContextContract) {
    const options = {
      page: request.input("page"),
      perPage: request.input("perPage"),
      search: request.input("search"),
      searchBy: request.input("searchBy"),
      orderBy: request.input("orderBy"),
      modulo: request.input("modulo"),
      ordenar: request.input("orderByAscOrDesc") || "asc",
    };

    const filtroLimpo = removeTextNullVariable(options);

    const result = await this.#role.findAll(filtroLimpo);

    return response.ok({
      message: null,
      object: result,
    });
  }

  public async show({ params, response }) {
    const { id } = params;

    const result = await this.#role.show(id);
    return response.ok({
      message: null,
      object: result,
    });
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const input = {
      modulo_id: request.input("modulo_id") || null,
      nome: String(request.input("nome")).trim() || null,
      name: String(request.input("name")).trim() || null,
      activo: Boolean(JSON.parse(request.input("activo"))),
      descricao: String(request.input("descricao")).trim() || null,
      user_id: auth?.user?.id,
    };

    const result = await this.#role.store(input);

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
    const input = {
      modulo_id: request.input("modulo_id") || null,
      nome: String(request.input("nome")).trim() || null,
      name: String(request.input("name")).trim() || null,
      activo: Boolean(JSON.parse(request.input("activo") || null)),
      descricao: String(request.input("descricao")).trim() || null,
      user_id: auth?.user?.id,
    };

    const result = await this.#role.update(params.id, input);

    return response.ok({
      message: "Sucesso ao actualizar!",
      object: result,
    });
  }

  public async delete({ auth, params, response }: HttpContextContract) {
    const result = await this.#role.delete(params.id, auth.user?.id);
    return response.ok({
      message: "Sucesso ao eliminar!",
      object: result,
    });
  }
}
