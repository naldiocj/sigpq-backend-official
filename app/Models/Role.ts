import {column, BaseModel, hasMany, HasMany, SnakeCaseNamingStrategy, BelongsTo, belongsTo} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import Permission from 'App/Models/Permission'
import Modulo from './Modulo'
// import { v4 as uuidv4 } from 'uuid';

export default class Role extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()
  public static primaryKey = 'id'
  public static table = 'roles'
  public static selfAssignPrimaryKey = false

  @column({isPrimary: true})
  public id: number

  @column({})
  public modulo_id: number

  @column({})
  public user_id: number

  @column({})
  public nome: string

  @column({})
  public name: string

  @column()
  public activo?: boolean

  @column({})
  public eliminado?: boolean

  @column({})
  public descricao: string
 
  @column.dateTime({autoCreate: true})
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
 
  // @beforeSave()
  // public static async setId(model: Role) {
    // model.id = uuidv4();
  // }
  
  @hasMany(() => Permission)
  public permissions: HasMany<typeof Permission>

  @belongsTo(() => Modulo)
  public modulo: BelongsTo<typeof Modulo>
}
