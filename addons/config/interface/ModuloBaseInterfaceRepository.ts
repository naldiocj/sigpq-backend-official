export default interface ModuloBaseInterfaceRepository {

  listarUmPorId(id: number): Promise<any>;

  listarTodos(options: any): Promise<any>;

  registar(input: Object): Promise<any>;

  actualizar(id: number, input: Object): Promise<any>;

  eliminar(id: number): Promise<any>;
}
