import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pessoajuridica extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sigla: string

  @column()
  public nif: string

  @column()
  public site?: string

  @column()
  public pessoajuridica_id: number // ++ id do da entidade que é o seu supervisor

  @column()
  public logotipo: string

  @column()
  public tipo_juridica_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
