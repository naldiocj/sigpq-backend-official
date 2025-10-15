import Database, { DatabaseQueryBuilderContract } from '@ioc:Adonis/Lucid/Database';
import BaseInterfaceRepository from '../interface/BaseInterfaceRepository';

export default class BaseRepository<T> implements BaseInterfaceRepository {

    private nomeTabela: string;
    private dateTime = new Date()

    constructor(nomeTabela: string) {
        this.nomeTabela = nomeTabela;
    }

    // READ ONE
    public async listarUmPorId(id: number): Promise<any> {
        return await Database.query().from(this.nomeTabela).where('id', id).first();
    }

    // READ ALL
    public async listarTodos(filtro: any): Promise<any[]> {

        let query: DatabaseQueryBuilderContract = Database.from(this.nomeTabela)
            .select(
                '*',
                Database.raw("DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
                Database.raw("DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
            )
            .where('eliminado', false);

        if (filtro.search) {
            query.where((item: any) => {
                item.where('nome', 'like', `%${filtro.search}%`).orWhere('sigla', 'like', `%${filtro.search}%`);
            });
        }

        if (filtro.ordenar) {
            query.orderBy(filtro.ordenar);
        }

        if (filtro.page) {
            return query.paginate(filtro.page, filtro.perPage || 10);
        }

        return await query;

    }

    // CREATE
    public async registar(props: Partial<T>, trx = null): Promise<any> {

        const propsAux = {
            ...props,
            created_at: this.dateTime,
            updated_at: this.dateTime,
        }

        const query = Database
            .insertQuery()
            .table(this.nomeTabela)
            .insert(propsAux);

        const result = trx ? query.useTransaction(trx) : query

        return trx ? await result : trx
    }

    // UPDATE
    public async editar(id: number, props: Partial<T>, trx = null): Promise<T | undefined> {
        const user = await this.listarUmPorId(id);
        if (user) {
            Object.assign(user, props);
            console.log(trx);

            return user;
        }
        return undefined;
    }

    // DELETE
    public async eliminar(id: number): Promise<T | undefined> {
        const user = await this.listarUmPorId(id);
        if (user) {
            return user;
        }
        return undefined;
    }
}
