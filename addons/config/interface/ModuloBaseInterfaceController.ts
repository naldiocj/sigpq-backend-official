type RepositoryContext = {
  auth: any,
  request: any,
  response: any,
  params
}

export default interface ModuloBaseInterfaceController {

  listarUmPorId({ auth, request, response }: RepositoryContext): Promise<any>;

  listarTodos({ auth, request, response }: RepositoryContext): Promise<any>;

  registar({ auth, request, response }: RepositoryContext): Promise<any>;

  editar({ params, auth, request, response }: RepositoryContext): Promise<any>;

  eliminar({ auth, request, response }: RepositoryContext): Promise<any>;
}
