import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

// import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Modulo from './Modulo'

export default class Permission extends BaseModel {
  public static primaryKey = 'id'
  public static table = 'permissions'
  public static selfAssignPrimaryKey = false

  @column({ isPrimary: true })
  public id: number

  @column({})
  public modulo_id: number

  @column({})
  public role_id: number


  @column({})
  public nome: string

  @column({})
  public name: string

  @column({})
  public tabela: string

  @column({})
  public operacao: string

  @column({})
  public activo: boolean

  @column({})
  public descricao: string

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.setZone('utc').toISO() : value
    },
  })
  public created_at: DateTime

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.setZone('utc').toISO() : value
    },
  })
  public updated_at: DateTime

  // @beforeSave()
  // public static async setId(model: Permission) {
  //   model.id = uuidv4();
  // }

  public static boot() {
    super.boot()

    this.before('create', async (_modelInstance) => {
      _modelInstance.created_at = this.formatDateTime(_modelInstance.created_at)
      _modelInstance.updated_at = this.formatDateTime(_modelInstance.updated_at)
    })
    this.before('update', async (_modelInstance) => {
      _modelInstance.created_at = this.formatDateTime(_modelInstance.created_at)
      _modelInstance.updated_at = this.formatDateTime(_modelInstance.updated_at)
    })
  }

  private static formatDateTime(datetime) {
    let value = new Date(datetime)
    return datetime
      ? value.getFullYear() +
      '-' +
      (value.getMonth() + 1) +
      '-' +
      value.getDate() +
      ' ' +
      value.getHours() +
      ':' +
      value.getMinutes() +
      ':' +
      value.getSeconds()
      : datetime
  }

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @belongsTo(() => Modulo)
  public modulo: BelongsTo<typeof Modulo>
}
