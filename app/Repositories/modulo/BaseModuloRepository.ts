 import Database, {
  DatabaseQueryBuilderContract,
} from "@ioc:Adonis/Lucid/Database";
import InternalServerException from "App/Exceptions/InternalServerException";

// const { Cache } = use('App/Services/CacheService')
export default class BaseModuloRepository {
  protected tabela: any;
  dateTime = new Date();

  constructor(tabela: any) {
    this.tabela = tabela;
  }

  /**
   * Create a row to tabela
   * @param {Object} [items]
   *
   * @throws {NotCreatedException}
   * @returns {Object} createdField
   */

  public async registar(items: any, trx: any = null): Promise<any> {
    try {
      const query = trx ? trx : Database;
      const value = {
        ...items,
        created_at: this.dateTime,
        updated_at: this.dateTime,
      };
      return await query
        .insertQuery() // 👈 gives an instance of insert query builder
        .table(this.tabela)
        .insert(value);
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * Create a row to tabela
   * @param {Object} [items]
   *
   * @throws {NotCreatedException}
   * @returns {Object} createdField
   */
  public async editar(items: any, id: number, trx: any = null): Promise<any> {
    try {
      const query = trx ? trx : Database;
      const value = {
        ...items,
        created_at: this.dateTime,
        updated_at: this.dateTime,
      };
      return await query
        .query() // 👈 gives an instance of insert query builder
        .from(this.tabela)
        .where("id", id)
        .update(value);
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * Create a row to tabela
   * @param {Object} [items]
   *
   * @throws {NotCreatedException}
   * @returns {Object} created
   */
  public async createMany(items: any, trx: any = null): Promise<any> {
    console.log("create many : ", items, trx);
  }

  /**
   * Return an element
   *
   * @param { any } id
   *
   * @throws { NotFoundException , InternalServerException}
   * @returns { Object } tabelaResponse
   */
  public async findById(id: any): Promise<any> {
    try {
      let query = Database.from(this.tabela)
        .select(
          "*",
          Database.raw(
            "DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"
          ),
          Database.raw(
            "DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt"
          )
        )
        .where("id", id)
        .where("eliminado", false);

      return await query.first();
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * Return an element
   *
   * @param { any } field and Value
   *
   * @throws { NotFoundException , InternalServerException}
   * @returns { Object } tabelaResponse
   */
  public async findByOne(fields: any[]): Promise<any> {
    try {
      let query = Database.from(this.tabela)
        .select(
          "*",
          Database.raw(
            "DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"
          ),
          Database.raw(
            "DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt"
          )
        )
        .where("eliminado", false);

      for (const iterator of fields) {
        query.where(iterator.field, iterator.value);
      }
      return await query.first();
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * Return an element
   *
   * @param { any } id
   *
   * @throws { NotFoundException , InternalServerException}
   * @returns { Object } tabelaResponse
   */
  public async findByAll(fields: any[]): Promise<any> {
    try {
      let query = Database.from(this.tabela)
        .select(
          "*",
          Database.raw(
            "DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"
          ),
          Database.raw(
            "DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt"
          )
        )
        .where("eliminado", false);

      for (const iterator of fields) {
        query.where(iterator.field, iterator.value);
      }

      return await query;
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * Returns a list of elements
   * @param { number } page
   *
   * @returns { object[] } findAll
   */
  public async listarTodos(options: any): Promise<any> {
    try {
      let query: DatabaseQueryBuilderContract = Database.from(this.tabela)
        .select(
          "*",
          Database.raw(
            "DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"
          ),
          Database.raw(
            "DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt"
          )
        )
        .where("eliminado", false)
        .where(function (item: any): void {
          if (options.search) {
            item.where("name", "like", `%${options.search}%`);
            item.orWhere("sigla", "like", `%${options.search}%`);
          }
        })
        .clone();

      return options.page
        ? await query.paginate(options.page, options.perPage || 10)
        : await query;
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * update an tabela line
   *
   * @param {Number} dataId
   * @param {Object} updatePayload
   * @param {Boolean} withIsDeleted
   *
   * @throws { NotUpdateException } when cannot update tabela
   * @returns { Object } tabelaResult
   */
  public async update(
    id: any,
    updatePayload: any = {},
    trx: any = null
  ): Promise<any> {
    try {
      const updatedRowsCount = await Database.from(this.tabela)
        .where("id", id)
        .update(updatePayload)
        .useTransaction(trx);

      return updatedRowsCount;
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  /**
   * Delete an tabela
   *
   * @param {Number} id
   * @param { DatabaseTransaction | null } trx
   * @param { Function } callback
   *
   * @throws { NotDeleteException } - delete a tabela
   * @returns { null }
   */
  // public async delete(id: any, user_id: any, trx: any = null): Promise<any> {
  //   console.log("delete one : ", id, user_id, trx);
  // }

  /**
   * Delete an tabela
   *
   * @param {Number} dataId
   * @param { DatabaseTransaction | null } trx
   * @param { Function } callback
   *
   * @throws { NotDeleteException } - delete a tabela
   * @returns { null }
   */
  public async deleteMany(dataId: any, trx: any = null): Promise<any> {
    console.log("delete many : ", dataId, trx);
  }

  public async findBy(field: any, value: any): Promise<any> {
    try {
      let query = Database.from(this.tabela)
        .select(
          "*",
          Database.raw("DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
          Database.raw("DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
        )
        .where("eliminado", false)
        .where(field, value);

      return await query.first();
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }

  public async delete(id: any, trx: any = null, user_id: any = null): Promise<any> {
    trx = trx ?? await Database.transaction();
    try {
      const query = await Database.from(this.tabela)
        .where("id", id)
        .useTransaction(trx)
        .update({
          eliminado: true || 1,
          user_id: user_id ?? null
        });
      await trx.commit()
      return query;
    } catch (e) {
      console.log(e)
      await trx.rollback();
      throw Error("Não foi foi possivel eliminar");
    }
  }

  public async findByDiff(id: any, field: any, value: any): Promise<any> {
    try {
      let query = Database.from(this.tabela)
        .select(
          "*",
          Database.raw(
            "DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"
          ),
          Database.raw(
            "DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt"
          )
        )
        .where("eliminado", false)
        .where(field, value)
        .where("id", "<>", id);

      return await query.first();
    } catch (e) {
      console.log(e);
      throw new InternalServerException();
    }
  }
}

module.exports = BaseModuloRepository
