import EstadoCivil from 'App/Models/EstadoCivil'
import BaseRepository from './BaseRepository'

export default class EstadoCivilRepository extends BaseRepository {
  constructor() {
    super(EstadoCivil)
  }
}
