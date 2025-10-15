export default interface BaseInterfaceRepository {

  listarUmPorId(id: number): Promise<any>;

  listarTodos(filtro: any): Promise<any>;

  registar(props: any): Promise<any>;

  editar(id: number, props: any): Promise<any>;

  eliminar(id: number): Promise<any>;
}
