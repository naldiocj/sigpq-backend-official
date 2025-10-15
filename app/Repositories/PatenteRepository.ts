
import Database from '@ioc:Adonis/Lucid/Database';
import Patente from 'App/Models/Patente'
import BaseRepository from 'App/Repositories/BaseRepository'


const getClass = (key: any) => {
  const classes = {
    'Oficial Comissário': {
      id: 7
    },
    'Oficial Superior': {
      id: 8
    },
    'Sub-Alterno': {
      id: 9
    },
    'Sub-Chefe': {
      id: 10
    },
    'Agente': {
      id: 11,
    }
  }
  return classes.hasOwnProperty(key) ? classes[key] : null
}




export default class PatenteRepository extends BaseRepository {
  constructor() {
    super(Patente)
  }

  public async listarTodos(options: any): Promise<any> {

    try {

      const query = Database.from({ p: 'patentes' })
        .select(
          'p.id',
          'p.nome',
          'p.sigla',
          'p.classe',
          'p.activo',
          'p.user_id',
          'p.descricao',
          'p.sigpq_tipo_carreira_id',
          Database.raw("DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
          Database.raw("DATE_FORMAT(p.updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
        ).where('p.eliminado', false)
        .orderBy('p.created_at')
        .leftJoin('sigpq_tipo_carreiras','sigpq_tipo_carreiras.id','p.sigpq_tipo_carreira_id')
        .where(query => {
          if (options.classe) {
            query.where('p.classe', options.classe)
          }

          if (options.regime_id) {
            query.where('sigpq_tipo_carreiras.regime_id', options.regime_id)
            query.where('sigpq_tipo_carreiras.nome','<>', 'Historico')
          }
        }).where((query: any) => {
          if (options.classeId && !options.tecnico) {
            query.where('p.sigpq_tipo_carreira_id', options.classeId)
          } else if (options.classeId && options.tecnico) {
            query.whereNull('p.sigpq_tipo_carreira_id')
          }
        })
        // .where((query: any) => {
        //   if (options.patente_em_tempo_id) {
        //     console.log(options.patente_em_tempo_id)
        //     query.where('p.id', '<', options.patente_em_tempo_id);
        //   }
        // })
        .where((query: any) => {
          if (options.search) {

            if (options.searchBy instanceof Array) {

              options.searchBy.forEach((key: any) => {

                query.orWhere(key, 'like', `%${options.search}%`)
              })
            } else {
              query.orWhere(options.searchBy, 'like', `%${options.search}%`)
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

      if (options.page) {
        const pagination = await query.paginate(options.page, options.perPage || 10)
        pagination['rows'] = await Promise.all(pagination['rows'].map(async (item: any) => {

          return {
            ...item,
            idCarreira: getClass(item.nome)
          }
        }))

        return pagination
      } else {
        const items = await query

        const all = await Promise.all(items.map(async (item: any) => {
          return {
            ...item,
            idCarreira: getClass(item.classe)

          }
        }))

        return all;
      }

      // return options.page ? await query.paginate(options.page, options.perPage || 10) : await query

    } catch (e) {
      console.log(e);
      return Error('Não foi possivel listar nenhum registo')
    }

  }
}
