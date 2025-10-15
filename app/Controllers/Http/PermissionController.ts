import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import { schema, rules } from '@ioc:Adonis/Core/Validator'

import PermissionRepository from "App/Repositories/PermissionRepository";
export default class PermissionController {
  #permissionRepo: PermissionRepository;

  constructor() {
    this.#permissionRepo = new PermissionRepository();
  }

  public async index({ request, response }: HttpContextContract) {
    const options = {
      page: request.input("page") || null,
      perPage: request.input("perPage") || null,
      search: request.input("search") || null,
      searchBy: ['nome', 'name', 'tabela', 'operacao', 'descricao'],
      orderBy: request.input("orderBy") || null,
      orderByAscOrDesc: request.input("orderByAscOrDesc") || "asc",
      modulo: request.input('modulo'),
      darAcesso: request.input('darAcesso') || null
    };

    const result = await this.#permissionRepo.findAll(options);

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

    // const roleSchema = schema.create({
    //   nome: schema.string({ trim: true }),
    //   name: schema.string({ trim: true }),
    // nome: schema.string({ trim: true }, [
    //   rules.unique({ table: 'roles', column: 'nome', caseInsensitive: true })
    // ]),
    // name: schema.string({ trim: true }, [
    //   rules.unique({ table: 'roles', column: 'name', caseInsensitive: true })
    // ]),
    // activo: schema.boolean(),
    // descricao: schema.string({ trim: true })
    // })

    // return roleSchema

    // const data = await request.validate({ schema: roleSchema })

    // return data

    const result = await this.#permissionRepo.store(input);

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
    // input.user_id = auth.user?.id;

    console.log(input)

    const result = await this.#permissionRepo.editar(params.id, input);

    if (result instanceof Error) {
      return response.badRequest({
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
    const result = await this.#permissionRepo.delete(params.id, auth.user?.id);
    return response.ok({
      message: "Sucesso ao eliminar!",
      object: result,
    });
  }

  public async toggleActivo({ auth, params, response }: HttpContextContract) {

    const result = await this.#permissionRepo.toggleActivo(params.id)

    if (result instanceof Error) {
      return response.badRequest({
        message: result.message,
        object: null
      })
    }

    return response.ok({
      message: "Sucesso ao alterar estado da permissão!",
      object: null,
    });
  }
}
