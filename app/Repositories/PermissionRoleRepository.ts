
import Database, { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database'
import BaseRepository from './BaseRepository'
import RolePermission from 'App/Models/RolePermission'

export default class PermissionRoleRepository extends BaseRepository {
  constructor() {
    super(RolePermission)
  }


  public async listarTodos(options: any): Promise<any> {
    try {
      const query: DatabaseQueryBuilderContract = Database.from({ rp: 'role_permissions' })
        .select(
          'rp.id',
          'rp.role_id',
          'rp.permission_id',
          'rp.activo',
          'p.nome as permission',
          'p.name as permission_sigla',
          'r.nome as role',
          'r.name as role_sigla',
          Database.raw("DATE_FORMAT(rp.created_at,'%d/%m/%Y %H:%i:%s') as created_at"),
          Database.raw("DATE_FORMAT(rp.updated_at,'%d/%m/%Y %H:%i:%s') as updated_at")
        )
        .innerJoin('permissions as p', 'p.id', 'rp.permission_id')
        .innerJoin('roles as r', 'r.id', 'rp.role_id')
        .where('rp.activo', true)
        .where(query => {
          if (options.roleId) {

            query.where('rp.role_id', options.roleId)
          }
        })
        .where(query => {
          if (options.search) {
            query.where('p.nome', options.search)
            query.orWhere('p.name', options.search)
            query.orWhere('r.nome', options.search)
            query.orWhere('r.name', options.search)
          }
        })


      return options.page ? await query.paginate(options.page, options.perPage || 10) : await query

    } catch (error) {
      console.log(error)
      return Error('Não foi listar items')
    }
  }


  public async registar(input: any, trx: any = null): Promise<any> {
    trx = trx ?? await Database.transaction()
    try {

      if (!input.role_id) {
        return Error('Sem funcão selecionado! Tente novamente')
      }
      if (!input?.permission_id) {
        return Error('Sem permissão selecionado! Tente novamente')
      }
      const rolePermission = await this.rolePermission(input?.modulo_id, input.role_id)
      if (rolePermission) {
        return Error('Este perfil já possui este nivel esta permissão')
      }

      const rolePermissions = await Database.from('role_permissions').where('role_id', input?.role_id).where('permission_id', input?.permission_id).first()

      if (rolePermissions) {
        if (rolePermissions?.activo) {
          await Database.from('role_permissions').where('role_id', input?.role_id).where('permission_id', input?.permission_id).update({
            activo: false,
            user_id: input?.user_id,
            updated_at: this.getDateTime.updated_at
          }).useTransaction(trx)
        } else if (!rolePermissions?.activo) {
          await Database.from('role_permissions').where('role_id', input?.role_id).where('permission_id', input?.permission_id).update({
            activo: true,
            user_id: input?.user_id,
            updated_at: this.getDateTime.updated_at
          }).useTransaction(trx)
        }
      } else {

        const inputRolePermissao = {
          role_id: input?.role_id,
          permission_id: input?.permission_id,
          user_id: input?.user_id,
          ...this.getDateTime
        }
        await Database.insertQuery().table('role_permissions').useTransaction(trx).insert(inputRolePermissao)
      }

      return await trx.commit()

    } catch (error) {
      await trx.rollback()
      console.log(error)
      return Error('Não foi possível register item')
    }
  }


  public async rolePermission(modulo_id: any, role_id: any): Promise<any> {
    return modulo_id && role_id ? await Database.from('role_permissions').where('modulo_id', modulo_id).where('role_id', role_id).first() : null
  }
  public get getDateTime() {
    return {
      created_at: new Date(),
      updated_at: new Date()
    }
  }

}
