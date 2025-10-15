import { column, BaseModel, belongsTo, BelongsTo, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Permission from 'App/Models/Permission'
// import { v4 as uuidv4 } from 'uuid';

export default class RolePermission extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'role_permissions'
  public static selfAssignPrimaryKey = false

  @column({ isPrimary: true })
  public id: number

  @column({})
  public role_id: number

  @column({})
  public permission_id: number

  @column({})
  public user_id: number

  @column({})
  public eliminado: boolean

  @column({})
  public activo: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  // @beforeSave()
  // public static async setId(model: RolePermission) {
  //   model.id = uuidv4();
  // }

  public static allowedRelationships(): Array<string> {
    return []
  }

  @belongsTo(() => Role, {
    localKey: 'role_id',
  })
  public role: BelongsTo<typeof Role>

  @belongsTo(() => Permission, {
    localKey: 'permission_id',
  })
  public permission: BelongsTo<typeof Permission>
}
