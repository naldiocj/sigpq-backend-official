import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Patente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public classe: string

  @column()
  public sigla: string

  @column()
  public descricao?: string

  @column()
  public user_id: number

  @column()
  public activo?: boolean

  @column()
  public eliminado?: boolean
  
  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}
