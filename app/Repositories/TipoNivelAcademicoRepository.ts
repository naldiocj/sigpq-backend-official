
import Database from "@ioc:Adonis/Lucid/Database";
import NotUpdateException from "App/Exceptions/NotUpdateException";

export class TipoNivelAcademicoRepository {


  public async listarTodos(options: any): Promise<any> {


    try {


      const query = Database.from({ d: 'tipo_nivel_academicos' })
        .select(
          'd.id',
          'd.nome',
          'd.sigla',
          Database.raw("DATE_FORMAT(d.created_at,'%d/%m/%Y %H:%i:%s') as created_at"),
          Database.raw("DATE_FORMAT(d.updated_at,'%d/%m/%Y %H:%i:%s') as updated_at")
        )
        .where('d.eliminado', false)
        .where(query => {

          if (options.search) {
            if (options.searchBy instanceof Array) {
              options.searchBy.forEach((key: any) => {
                query.orWhere(key, 'like', `%${options.search}%`)
              })
            } else {
              query.orWhere(options.searchBy, 'like', `%${options.search}%`)
            }
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
      return options.page ? await query.paginate(options.page, options.perPage || 10) : await query
    } catch (e) {
      console.log(e)
      throw new NotUpdateException()
    }
  }
}
