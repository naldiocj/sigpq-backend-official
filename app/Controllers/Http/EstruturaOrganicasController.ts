import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import EstruturaOrganicaRepository from "App/Repositories/EstruturaOrganicaRepository";

const removeTextNullVariable = require("App/@piips/shared/metodo-generico/RemoveTextNullVariable");

export default class RoleController {
  #role: EstruturaOrganicaRepository;

  constructor() {
    this.#role = new EstruturaOrganicaRepository();
  }

  public async index({ request, response }: HttpContextContract) {
    const options = {
      page: request.input("page"),
      perPage: request.input("perPage"),
      search: request.input("search"),
      searchBy: request.input("searchBy"),
      orderBy: request.input("orderBy"),
      modulo: request.input("modulo"),
      ordenar: 'nome',
    };

    const filtroLimpo = removeTextNullVariable(options);

    const result = await this.#role.listarTodos(filtroLimpo);
    

    return response.ok({
      message: null,
      object: result,
    });
  }

  public async show({ params, response }) {
    const { id } = params;

    const result = await this.#role.findById(id);
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

    const result = await this.#role.registar(input);

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
