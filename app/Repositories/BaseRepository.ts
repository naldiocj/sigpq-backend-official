
// const { Cache } = use('App/Services/CacheService')
import NotFoundException from 'App/Exceptions/NotFoundException'
import NotCreatedException from 'App/Exceptions/NotCreatedException'
import InternalServerException from 'App/Exceptions/InternalServerException'
import NotDeleteException from 'App/Exceptions/NotDeleteException'

export default class BaseRepository {
  #model: any
  constructor(model: any) {
    this.#model = model
  }

  /**
   * Create a row to model
   * @param {Object} [modelNew]
   *
   * @throws {NotCreatedException}
   * @returns {Object} createdField
   */
  public async store(modelNew: any, trx: any = null): Promise<any> {
    try {
      // modelNew.id = uuidv4();
      const item = await (new this.#model)
        .fill(modelNew)
        .useTransaction(trx)
        .save();

      return {
        item: item,
        trx: trx
      }

    } catch (e) {
      console.log(e)
      throw new NotCreatedException(null)
    }
  }

  /**
   * Create a row to model
   * @param {Object} [modelNew]
   *
   * @throws {NotCreatedException}
   * @returns {Object} created
   */
  public async createMany(modelNew: any, trx: any = null): Promise<any> {
    try {
      return await this.#model.createMany(modelNew, trx)
    } catch (e) {
      console.log(e)
      throw new NotCreatedException(null);
    }
  }

  /**
   * Return an element
   *
   * @param { any } id  
   *
   * @throws { NotFoundException , InternalServerException}
   * @returns { Object } modelResponse
   */
  public async findById(id: any): Promise<any> {
    try {
      const item = await this.#model
        .query()
        .select('*')
        .where('id', id)
        .where('eliminado', false)
        .first()
      if (!item) {
        throw new NotFoundException('Não foi possível encontrar!')
      }
      return item;
    } catch (e) {
      console.log(e)
      throw new InternalServerException()
    }
  }

  /**
   * Return an element
   *
   * @param { any } id  
   *
   * @throws { NotFoundException , InternalServerException}
   * @returns { Object } modelResponse
   */
  public async findBy(field: any, value: any): Promise<any> {

    try {
      const item = await this.#model
        .query()
        .select('*')
        .where(field, value)
        .where('eliminado', false)
        .first()
      if (!item) {
        throw new NotFoundException('Não foi possível encontrar!')
      }
      return item;
    } catch (e) {
      console.log(e)
      throw new InternalServerException()
    }
  }

  /**
   * Returns a list of elements
   * @param { number } page
   *
   * @returns { object[] } findAll
   */
  public async findAll(options: any = { page: null, perPage: null, search: null, searchBy: null, orderBy: null, orderByAscOrDesc: null }): Promise<any> {
    // try {
    let query = this.#model
      .query()
      .where('eliminado', false)
      .where(function () {
        if (options.search) {
          if (options.searchBy instanceof Array) {
            options.searchBy.forEach((key: any) => {
              query.orWhere(key, 'like', `%${options.search}%`)
            })
          } else {
            query.orWhere(options.searchBy, 'like', `%${options.search}%`)
          }
        }
        if (options.orderBy) {

          if (options.orderBy instanceof Array) {
            options.orderBy.forEach((key: any) => {
              query.orderBy(key, options.orderByAscOrDesc)
            })
          } else {
            query.orderBy(options.orderBy, options.orderByAscOrDesc)
          }
        }
      }).clone()

    return options.page
      ? await query.paginate(options.page, options.perPage || 10)
      : await query
    // } catch (e) {
    //   console.log(e)
    //   throw new NotFoundException('Não foi possível listar!')
    // }
  }

  /**
   * update an model line
   *
   * @param {Number} dataId
   * @param {Object} updatePayload
   * @param {Boolean} withIsDeleted
   *
   * @throws { NotUpdateException } when cannot update model
   * @returns { Object } modelResult
   */
  public async update(id: any, updatePayload: any = {}, trx: any = null): Promise<any> {

    try {
      const exist = await this.#model
        .query()
        .where('eliminado', false)
        .where('id', id)
        .first()


      if (exist) {
        await exist.merge(updatePayload).useTransaction(trx).save()
      }

      return {
        item: exist,
        trx: trx
      }

    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }

  }

  /**
   * Delete an model
   *
   * @param {Number} id
   * @param { DatabaseTransaction | null } trx
   * @param { Function } callback
   *
   * @throws { NotDeleteException } - delete a model
   * @returns { null }
   */
  public async delete(id: any, user_id: any, trx: any = null): Promise<any> {

    // try {
    const item = await this.#model.findOrFail(id)

    if (item.length) {
      throw new NotFoundException('Este registo não existe !')
    }

    if (item.eliminado) {
      throw new NotDeleteException('Este registo já se encontra eliminado!')
    }

    if (user_id) {
      item.user_id = user_id;
    }

    item.eliminado = true;

    return {
      item: await item.useTransaction(trx).save(),
      trx: trx
    }

    // } catch (e) {
    //   console.log(e)
    //   throw new InternalServerException()
    // }
  }

  /**
   * Delete an model
   *
   * @param {Number} dataId
   * @param { DatabaseTransaction | null } trx
   * @param { Function } callback
   *
   * @throws { NotDeleteException } - delete a model
   * @returns { null }
   */
  public async deleteMany(dataId: any, trx: any = null): Promise<any> {
    console.log(dataId, trx);

    try {
      // const modelResult = await this.findById(modelId)

      // modelResult.is_deleted = true

      // return await modelResult.save(trx ? trx:null)
      // await modelResult.audit("delete").save(trx) 
    } catch (e) {
      console.log(e)
      throw new NotFoundException('Não foi possível eliminar!')
    }
  }
}

module.exports = BaseRepository
