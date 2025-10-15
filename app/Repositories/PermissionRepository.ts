import Permission from 'App/Models/Permission'
import BaseRepository from './BaseRepository'
import Database, { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class PermissionRepository extends BaseRepository {
  constructor() {
    super(Permission)
  }

  public async findAll(options: any = { page: null, perPage: null, search: null, searchBy: null, orderBy: null, orderByAscOrDesc: null }): Promise<any> {
    try {
      let query: DatabaseQueryBuilderContract = Database.from('permissions')
        .select(
          'id',
          'nome',
          'activo',
          'descricao',
          Database.raw("DATE_FORMAT(created_at,'%d/%m/%Y %H:%i:%s') as created_at"),
          Database.raw("DATE_FORMAT(updated_at,'%d/%m/%Y %H:%i:%s') as updated_at")
        )
        .where('eliminado', false)
        .where((query: any) => {
          if (options.darAcesso) {

            query.where('activo', true)
          }

        })
        .where(query => {
          if (options.modulo) {
            query.where('modulo_id', options.modulo)
          }
        })
        .where(query => {
          if (options.search) {
            if (options.searchBy instanceof Array) {
              options.searchBy.forEach((key: any) => {
                query.orWhere(key, 'like', `%${options.search}%`)
              })
            } else {
              query.where(options.searchBy, 'like', `%${options.search}%`)
            }
          }
        })
        .where(query => {
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
    } catch (e) {
      console.log(e)
      throw new NotFoundException('Não foi possível listar!')
    }

  }

  public async editar(id: any, input: any, trx: any = null): Promise<any> {

    trx = trx ?? await Database.transaction()

    try {

      if (!input.nome) {
        return Error('Preencha o nome da permissão')
      }


      await Database.from('permissions').where('id', id).update({
        nome: input?.nome,
        descricao: input?.descricao,
        updated_at: new Date()
      }).useTransaction(trx)


      return await trx.commit()

    } catch (e) {
      console.log(e)
      await trx.rollback()
      return Error('Não foi possível editar permissão')
    }
  }
  public async toggleActivo(id: any, trx: any = null): Promise<any> {
    trx = trx ?? await Database.transaction()
    try {

      const permission = await Database.from('permissions').select('*').where('id', id).first()

      await Database.from('permissions').where('id', id).update({
        updated_at: new Date(),
        activo: Number(!permission?.activo)
      }).useTransaction(trx)


      return await trx.commit()


    } catch (error) {
      console.log(error)
      await trx.rollback()
      return Error('Não foi possível alterar estado da permissão')
    }
  }

}
