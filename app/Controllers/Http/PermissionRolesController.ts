import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PermissionRoleRepository from "App/Repositories/PermissionRoleRepository";
const removeTextNullVariable = require("App/@piips/shared/metodo-generico/RemoveTextNullVariable");

export default class PermissionController {
  #permissionRepo: PermissionRoleRepository;

  constructor() {
    this.#permissionRepo = new PermissionRoleRepository();
  }

  public async index({ request, response }: HttpContextContract) {
    const options = {
      page: request.input("page") || null,
      perPage: request.input("perPage") || null,
      search: request.input("search") || null,
      searchBy: request.input("searchBy") || null,
      orderBy: request.input("orderBy") || null,
      orderByAscOrDesc: request.input("orderByAscOrDesc") || "asc",
      roleId: request.input('roleId') || null
    };

    const filtroLimpo = removeTextNullVariable(options);

    const result = await this.#permissionRepo.listarTodos(filtroLimpo);

    return response.ok({
      message: null,
      object: result,
    });
  }

  public async show({ params, response }) {
    const result = await this.#permissionRepo.findById(params.id);
    return response.ok({
      message: null,
      object: result,
    });
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const input = request.all();
    input.user_id = auth.user?.id;


    const result = await this.#permissionRepo.registar(input);

    if (result instanceof Error) {
      return response.badRequest({
        message: result.message,
        object: null
      })
    }

    return response.ok({
      message: "Sucesso na alteração de permissão!",
      object: null,
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

    const result = await this.#permissionRepo.update(params.id, input);

    return response.ok({
      message: "Sucesso ao actualizar!",
      object: result,
    });
  }

  public async delete({ auth, params, response }: HttpContextContract) {
    const result = await this.#permissionRepo.delete(params.id, auth.user?.id);
    return response.ok({
      message: "Sucesso ao eliminar!",
      object: result,
    });
  }
}
