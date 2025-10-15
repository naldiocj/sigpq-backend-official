import Regime from 'App/Models/Regime'
import BaseRepository from './BaseRepository'

export default class RegimeRepository extends BaseRepository {
  constructor() {
    super(Regime)
  }
}
