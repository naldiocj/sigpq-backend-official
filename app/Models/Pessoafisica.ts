import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pessoafisica extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public foto_civil?: string

  @column()
  public apelido: string

  @column()
  public genero: string

  @column()
  public nome_mae?: string

  @column()
  public nome_pai?: string

  @column()
  public data_nascimento: Date

  @column()
  public regime_id: number

  @column()
  public nacionalidade_id: number

  @column()
  public estado_civil_id: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime 
}
