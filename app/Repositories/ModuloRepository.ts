import Database from '@ioc:Adonis/Lucid/Database'
import Modulo from 'App/Models/Modulo'
import BaseRepository from './BaseRepository'

export default class ModuloRepository extends BaseRepository {
  constructor() {
    super(Modulo)
  }
  /**
 * Returns a list of elements
 * @param { number } page
 *
 * @returns { object[] } findAll
 */
  public async findAll(options: any = { page: null, perPage: null, search: null, searchBy: null, orderBy: null, orderByAscOrDesc: null }): Promise<any> {
    // try {
    let query = Database
      .query()
      .from('modulos')
      .orderBy('nome', 'asc')
      .where("eliminado", false)
      .where(query => {
        if (options.search) {
          query.where('nome', 'like', `%${options.search}%`)
          query.orWhere('sigla', 'like', `%${options.search}%`)
          query.orWhere('id', 'like', `%${options.search}%`)
        }
        if (options.orderBy) {
          if (options.orderBy instanceof Array) {
            options.orderBy.forEach((key: any) => {
              query.orderBy(key, options.orderByAscOrDesc)
            })
          } else {
            query.orderBy(options.orderBy, options.orderByAscOrDesc)
          }
        }
      }).clone()
    return options.page
      ? await query.paginate(options.page, options.perPage || 10)
      : await query
    // } catch (e) {
    //   console.log(e)
    //   throw new NotFoundException('Não foi possível listar!')
    // }
  }
}
