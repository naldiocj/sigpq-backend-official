import Database, { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database'
// import NotCreatedException from 'App/Exceptions/NotCreatedException'
import NotUpdateException from 'App/Exceptions/NotUpdateException'
import Role from 'App/Models/Role'
import RoleValidator from 'App/Validators/RoleValidator'
import BaseRepository from './BaseRepository'
import RoleDto from './Dto/RoleDto'
import NotFoundException from 'App/Exceptions/NotFoundException'

export default class RoleRepository extends BaseRepository {

  constructor() {
    super(Role)
  }

  public async findAll(options: any): Promise<any> {
    
    try {

      let query: DatabaseQueryBuilderContract = Database.from({ r: 'roles' })
        .select(
          'r.*',
          'm.nome as modulo_nome',
          'm.sigla as modulo_sigla',
          Database.raw("DATE_FORMAT(r.created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
          Database.raw("DATE_FORMAT(r.updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
        )
        .innerJoin('modulos as m', 'm.id', 'r.modulo_id')

      if (options.modulo) {
        query.where('r.modulo_id', options.modulo)
      }

      query.where('r.eliminado', false)
        .orderBy('r.name', 'asc')
        .where(function (item) {
          if (options.search) {
            item.orWhere('r.nome', 'like', `%${options.search}%`)
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

  public async findPermissions(role_id: any) {

    try {

      const rolePermissions = await Database
        .query()
        .from({ rp: 'role_permissions' })
        .select(
          'permissions.id',
          'permissions.nome',
          'permissions.name'
        )
        .innerJoin('permissions', 'permissions.id', 'rp.permission_id')
        .where('rp.role_id', role_id)
        .orderBy('permissions.name', 'asc')
        .then((itens) => {

          // const arr = []

          // for (const iterator of itens) {
          // arr.push(iterator.name)
          // }

          return itens

        })

      return rolePermissions

    } catch (e) {
      console.log(e);
      // throw new NotFoundException('Não foi possível encontrar!')
    }
  }

  public async store(input): Promise<any> {

    const dto = new RoleDto(input)

    if (dto.executar()) {
      // throw new NotCreatedException('Campos em falta...')
    }

    const roleField = new RoleValidator()

    if (roleField.executar(input)) {

    }

    // return {
    //   validar: await roleField.executar(input),
    //   dto: dto.executar()
    // }

    // const error: any = [];

    // const trx = await Database.transaction()
    // try {

    //   const moduloNotExist = await Database.from('modulos').where('id', '!=', input.modulo_id);

    //   if (moduloNotExist.length) {
    //     error.push({ name: 'Módulo não exite ! ' });
    //   }

    //   const roleExist = await Database.from('roles').where('name', input.name);

    //   if (roleExist.length) {
    //     error.push({ name: 'Função já existe ! ' });
    //   }

    //   if (error.length) {
    //     throw new NotCreatedException();
    //   }

    //   return await Role.create(input, trx)

    // } catch (e) {
    //   throw new NotCreatedException(null, error)
    // }
  }

  public async update(id: any, input: any): Promise<any> {

    const error: any = [];

    try {

      const role = await this.findById(id);

      if (!role) {
        return 'Função não existe !';
      }

      const moduloNotExist = await Database.from('modulos')
        .where('id', '!=', input.modulo_id)
        .first()

      if (moduloNotExist) {
        error.push({ name: 'Módulo não exite ! ' });
      }

      const roleExist = await Database.from('roles')
        .where('name', input.name)
        .where('nome', input.nome)
        .where('id', '!=', id)
        .where('eliminado', false)
        .first();

      if (roleExist) {
        error.push({ name: 'Função já existe ! ' });
      }

      if (error.length) {
        throw new NotUpdateException();
      }

      return await role.merge(input).save()

    } catch (e) {
      throw new NotUpdateException(null, error)
    }
  }

}
