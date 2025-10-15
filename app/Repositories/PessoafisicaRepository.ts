import Pessoafisica from 'App/Models/Pessoafisica'
import BaseRepository from './BaseRepository'

export default class PessoafisicaRepository extends BaseRepository {

  constructor() {
    super(Pessoafisica)
  }

}
