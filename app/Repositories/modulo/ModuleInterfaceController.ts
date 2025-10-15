import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default interface ModuleInterfaceController {

  listarUm({ auth, request, response,  }: HttpContextContract): Promise<any>;

  listarTodos({ auth, request, response }: HttpContextContract): Promise<any>;

  registar({ auth, request, response }: HttpContextContract): Promise<any>;

  editar({ params, auth, request, response }: HttpContextContract): Promise<any>;

  eliminar({ auth, request, response }: HttpContextContract): Promise<any>;
}
