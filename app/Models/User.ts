import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Pessoa from './Pessoa'
import UserHelper from 'App/Helper/UserHelper'
// import { v4 as uuidv4 } from 'uuid';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() // ++
  public username: string // ++

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public activo?: boolean

  @column()
  public notificar_por_email: boolean

  @column()
  public forcar_alterar_senha: boolean

  @column({})
  public pessoa_id: number

  @column({})
  public user_id: number

  @column({})
  public descricao: string

  @column()
  public eliminado: boolean

  @column()
  public is_revoked: number

  // @column()
  // public getForceChangePassword(value) {
  //   return Boolean(value)
  // }

  // @column()
  // public getIsActive(value) {
  //   return Boolean(value)
  // }

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    const salt = new UserHelper();
    if (user.$dirty.password) {
      user.password = await Hash.make(await salt.getSalt() + user.password)
    }
  }
 
  // @beforeSave()
  // public static async setId(model: User) {
  //   model.id = uuidv4();
  // }

  @belongsTo(() => Pessoa)
  public pessoa: BelongsTo<typeof Pessoa>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
