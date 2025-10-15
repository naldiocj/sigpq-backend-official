import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'
import Role from 'App/Models/Role'
import { DateTime } from 'luxon'
// import { v4 as uuidv4 } from 'uuid';

export default class UserRole extends BaseModel {
  public static primaryKey = 'id'
  public static table = 'user_roles'
  public static selfAssignPrimaryKey = false

  @column({isPrimary: true})
  public id: number

  @column({})
  public user_id: number

  @column({})
  public role_id: number

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  // @beforeSave()
  // public static async setId(model: UserRole) {
  //   model.id = uuidv4();
  // }

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>
}
