import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import { v4 as uuidv4 } from 'uuid';

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_ordem?: number

  @column()
  public nome_completo: string

  @column()
  public email_pessoal: string

  @column()
  public tipo: string

  @column({})
  public user_id: number

  @column()
  public activo?: boolean

  @column()
  public eliminado?: boolean
  
  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
 
  // @beforeSave()
  // public static async setId(model: Pessoa) {
  //   model.id = uuidv4();
  // }
}
