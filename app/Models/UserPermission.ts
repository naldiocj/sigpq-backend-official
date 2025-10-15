import {column, BaseModel, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Permission from 'App/Models/Permission'
import { DateTime } from 'luxon'
// import { v4 as uuidv4 } from 'uuid';

export default class UserPermission extends BaseModel {
  public static primaryKey = 'id'
  public static table = 'user_permissions'
  public static selfAssignPrimaryKey = false

  @column({isPrimary: true})
  public id: number

  @column({})
  public user_id: string

  @column({})
  public permission_id: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
 
  // @beforeSave()
  // public static async setId(model: UserPermission) {
  //   model.id = uuidv4();
  // }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Permission)
  public permission: BelongsTo<typeof Permission>
}
