import ModuloBaseInterfaceRepository from "../interface/ModuloBaseInterfaceRepository"
const {mysql2} = require('../database/database');


export default class ModuloBaseRepository<T> implements ModuloBaseInterfaceRepository {

  private nomeTabela: string;
  private dateTime = new Date()

  constructor(nomeTabela: string) {
      this.nomeTabela = nomeTabela;
  }

  // READ ONE
  /**
   * 
   * @param id 
   * @returns 
   */
  public async listarUmPorId(id: number): Promise<any> {
      return await mysql2.query().from(this.nomeTabela).where('id', id).first();
  }

  // READ ALL
  /**
   * 
   * @param filtro 
   * @returns 
   */
  public async listarTodos(filtro: any): Promise<any[]> {

      let query = mysql2.from(this.nomeTabela)
          .select(
              '*',
              mysql2.raw("DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
              mysql2.raw("DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
          )
          .where('eliminado', false);

      if (filtro.search) {
          query.where((item: any) => {
              item.where('nome', 'like', `%${filtro.search}%`).orWhere('sigla', 'like', `%${filtro.search}%`);
          });
      }

      if (filtro.ordenar) {
          query.orderBy(filtro.ordenar);
      }

      if (filtro.page) {
          return query.paginate(filtro.page, filtro.perPage || 10);
      }

      return await query;

  }

  // CREATE
  /**
   * 
   * @param props 
   * @param trx 
   * @returns 
   */
  public async registar(props: Partial<T>, trx = null): Promise<any> {

      const propsAux = {
          ...props,
          created_at: this.dateTime,
          updated_at: this.dateTime,
      }

      const query = mysql2
          .insertQuery() // 👈 gives an instance of insert query builder
          .table(this.nomeTabela)
          .insert(propsAux);

      const result = trx ? query.useTransaction(trx) : query

      return trx ? await result : trx
  }

  // UPDATE
  /**
   * 
   * @param id 
   * @param props 
   * @param trx 
   * @returns 
   */
  public async actualizar(id: number, props: Partial<T>, trx = null): Promise<T | undefined> {
      const user = await this.listarUmPorId(id);
      if (user) {
          Object.assign(user, props);
          console.log(trx);
          
          return user;
      }
      return undefined;
  }

  // DELETE
  /**
   * 
   * @param id 
   * @returns 
   */
  public async eliminar(id: number): Promise<T | undefined> {
      const user = await this.listarUmPorId(id);
      if (user) {
          return user;
      }
      return undefined;
  }
}

// module.exports = ModuloBaseRepository
