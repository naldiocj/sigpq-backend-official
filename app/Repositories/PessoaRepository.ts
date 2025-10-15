import Database from '@ioc:Adonis/Lucid/Database'
import NotCreatedException from 'App/Exceptions/NotCreatedException'
import Pessoa from 'App/Models/Pessoa'
import BaseRepository from './BaseRepository'
import InternalServerException from 'App/Exceptions/InternalServerException'

export default class PessoaRepository extends BaseRepository {

  constructor() {
    super(Pessoa)
  }

  /**
   * Return an element
   *
   * @param { any } id  
   *
   * @throws { NotFoundException , InternalServerException}
   * @returns { Object } modelResponse
   */
  public async findById(id: number): Promise<any> {

    try {
      const query = await Database.from({ p: 'pessoas' })
        .select(
          'p.id',
          'p.numero_ordem',
          'p.nome_completo',
          'p.email_pessoal',
          'p.activo',
          // 'pessoafisicas.foto_civil',
          // 'pessoafisicas.apelido',
          // 'pessoafisicas.genero',
          // 'pessoafisicas.nome_pai',
          // 'pessoafisicas.nome_mae',
          // 'pessoafisicas.data_nascimento',
        )
        .innerJoin('pessoafisicas', 'pessoafisicas.id', 'p.id')
        .where('p.id', id)
        .where('p.eliminado', false)
        .first() 
      return query;
    } catch (e) {
      console.log(e)
      throw new InternalServerException()
    }
  }

  public async storeTeste(input: any, trxs = null): Promise<any> {
    console.log('error : ', trxs);

    const error: any = [];

    const pessoa = new Pessoa();


    const trx = await Database.transaction()
    const result = await pessoa.fill(input).useTransaction(trx).save();

    await trx.rollback()
    return result


    // if (trx) {
    // trx = await Database.transaction()
    // }

    try {

      // return await Database.transaction(async (trx) => {
      //   await trx.insert(input).into(Pessoa)
      // });
      // const pessoa = new Pessoa();
      // return await pessoa.fill(input: PessoaINPUT).useTransaction(trx).save();

    } catch (e) {
      throw new NotCreatedException(null, error)
    }
  }

}
