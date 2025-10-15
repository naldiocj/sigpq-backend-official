import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const { ok } = require('App/Helper/Http-helper');
import PnaAgenteRespsitorio from 'App/Repositories/PnaAgenteRepository';

const removeTextNullVariable = require('App/@piips/shared/metodo-generico/RemoveTextNullVariable')
export default class PnaAgentesController {
  #crud
  constructor() {
    this.#crud = new PnaAgenteRespsitorio()
  }

  public async index({ request, response }: HttpContextContract) {

    const input = removeTextNullVariable({
      ...request.all(),
    })
    const options = {
      page: input.page,
      perPage: input.perPage,
      search: input.search,
      regimeId: input.regimeId,
      patenteId: input.patenteId,
      tipoVinculoId: input.tipoVinculoId,
      tipoOrgaoId: input.tipoOrgaoId,
      orgaoId: input.orgaoId,
      estadoId: input.estadoId,
      situacaoId: input.situacaoId,
      idadeMenos: input.idadeMenos,
      idadeMais: input.idadeMais,
      anoMais: input.anoMais,
      anoMenos: input.anoMenos,
      genero: input.genero,
      patenteClasse: input.patenteClasse,
      orderByAscOrDesc: input.orderByAscOrDesc || 'asc',
      forcaPassiva: input.forcaPassiva
    }

    const result = await this.#crud.listarTodos(options)

    if (result instanceof Error) {
      return response.badRequest({
        message: result.message,
        object: null,
      });
    }

    return ok(result, null);

  }



  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const result = await this.#crud.listarUm(id)

    if (result instanceof Error) {
      return response.badRequest({
        message: result.message,
        object: null,
      });
    }

    return ok(result, null);
  }


}
