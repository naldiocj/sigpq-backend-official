import Pais from 'App/Models/Pais'
import BaseRepository from './BaseRepository'

export default class PaisRepository extends BaseRepository {
  constructor() {
    super(Pais)
  } 
}
