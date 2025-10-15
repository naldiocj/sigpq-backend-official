
import Database, { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database'
import BaseModuloRepository from './modulo/BaseModuloRepository'


export default class ProvinciaRepository extends BaseModuloRepository {
  constructor() {
    super('provincias')
  }

  public async listarTodos(options: any): Promise<any> {

    try {

      let query: DatabaseQueryBuilderContract = Database.from({ s: 'provincias' })
        .select(
          's.id',
          Database.raw('upper(s.nome) as nome'),
          Database.raw('upper(s.sigla) as sigla'),
          's.activo',
          's.descricao',
          Database.raw("DATE_FORMAT(s.created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
          Database.raw("DATE_FORMAT(s.updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
        )
        .where('s.eliminado', false)
        .orderBy('s.nome', 'asc').orderBy('s.created_at', 'desc')


        .where(query => {
          if (options.search) {
            query.where('s.nome', 'like', `%${options.search}%`)
            query.orWhere('s.sigla', 'like', `%${options.search}%`)
            query.orWhere('s.nome', 'like', `%${options.search}%`)
          }
        })

      return options.page
        ? await query.paginate(options.page, options.perPage || 10)
        : await query


    } catch (e) {
      console.log(e);
      return Error('Não foi possível listar os registos.');
    }

  }

  public async editar(input: any, id: number, trx: any = null): Promise<any> {


    trx = trx ?? await Database.transaction()

    try {


      if (!input.nome) {
        return Error('Nome da província é obrigatório')
      }
      // if (!input.sigla) {
      //   return Error('Sigla da província é obrigatório')
      // }
      if (!input.user_id) {
        return Error('Tens de estar logado')
      }
      const provinciaNome = await Database.from('provincias')
        .select(
          "*",

        )
        .where("eliminado", false)
        .where('nome', input.sigla)
        .where("id", "<>", id).first()
      const provinciaSigla = await Database.from('provincias')
        .select(
          "*",

        )
        .where("eliminado", false)
        .where('sigla', input.nome)
        .where("id", "<>", id).first()


      if (provinciaNome) {
        return Error("Província com este nome já existe")
      }

      if (provinciaSigla) {
        return Error("Província com esta sigla já existe")
      }



      input.created_at = new Date()
      input.updated_at = new Date()


      await Database.from('provincias')
        .where("id", id)
        .update(input)
        .useTransaction(trx);

      return await trx.commit()
    } catch (e) {
      await trx.rollback()
      console.log(e);
      return Error('Não foi possível criar um novo curso.');
    }

  }

}
