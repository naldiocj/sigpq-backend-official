import Database, { DatabaseQueryBuilderContract } from "@ioc:Adonis/Lucid/Database"

import OrgaoCrudBaseRepository from '../../addons/modulo-sigpq/src/config/direcao-ou-orgao/repositories/crud-base-repositorio'

export default class PnaAgenteRespsitorio {
  #orgaoCrudBaseRepository: OrgaoCrudBaseRepository

  constructor() {
    this.#orgaoCrudBaseRepository = new OrgaoCrudBaseRepository();
  }

  // public async listarTodos(options: any): Promise<any> {

  //   try {

  //     let query: DatabaseQueryBuilderContract = Database.from({ f: 'sigpq_funcionarios' })

  //       .select(
  //         Database.raw("concat(p.nome_completo, ' ',pf.apelido) as nome_agente"),
  //         'f.nip',
  //         'f.numero_agente',
  //         'f.foto_efectivo',
  //         'f.id',
  //         'patentes.nome as patente',
  //       )
  //       .innerJoin('pessoas as p', 'p.id', 'f.id')
  //       .innerJoin('pessoafisicas as pf', 'pf.id', 'f.id')
  //       .innerJoin('sigpq_provimentos', 'sigpq_provimentos.pessoa_id', 'p.id')
  //       .innerJoin('patentes', 'patentes.id', 'sigpq_provimentos.patente_id')
  //       .innerJoin('sigpq_funcionario_orgaos', 'sigpq_funcionario_orgaos.pessoafisica_id', 'p.id')
  //       .innerJoin('pessoajuridicas as pj', 'pj.id', 'sigpq_funcionario_orgaos.pessoajuridica_id')
  //       .where('sigpq_provimentos.activo', true)
  //       .where('sigpq_provimentos.eliminado', false)
  //       .where('sigpq_funcionario_orgaos.activo', true)
  //       .where('sigpq_funcionario_orgaos.eliminado', false)
  //       .where('p.eliminado', false)

  //       .where('p.eliminado', false)
  //       .orderBy('p.updated_at', 'desc')

  //     if (options.regimeId) {
  //       query.where('pf.regime_id', Number(options.regimeId))
  //     }

  //     if (options.patenteId) {
  //       query.where('patentes.id', Number(options.patenteId))
  //     }

  //     if (options.tipoVinculoId) {
  //       query.where('f.sigpq_tipo_vinculo_id', Number(options.tipoVinculoId))
  //     }

  //     if (options.tipoOrgaoId) {
  //       query.whereLike('pj.orgao_comando_provincial', options.tipoOrgaoId)
  //     }

  //     if (options.genero) {
  //       query.where('pf.genero', options.genero)
  //     }

  //     if (options.dashboard) {

  //       if (options.patenteClasse) {
  //         query.where('patentes.sigpq_tipo_carreira_id', options.patenteClasse)
  //       }
  //     }

  //     query.where(function (item: any): void {

  //       if (options.search) {
  //         item.orWhere('p.nome_completo', 'like', `%${options.search}%`)
  //         item.orWhere('pf.apelido', 'like', `%${options.search}%`)
  //         item.orWhere('f.nip', 'like', `%${options.search}%`)
  //         item.orWhere('f.numero_processo', 'like', `%${options.search}%`)
  //         item.orWhere('f.numero_agente', 'like', `%${options.search}%`)
  //         item.orWhereRaw("concat(p.nome_completo, ' ',pf.apelido) like ?", `%${options.search}%`)
  //         // item.orWhere('pj.sigla', 'like', `%${options.search}%`)

  //         const date = new Date(options.search);
  //         if (!isNaN(date.getTime())) {
  //           const [day, month, year] = options.search.split('/');

  //           let data = ""
  //           if (day && month && year) {
  //             data = `${year}-${month}-${day}`
  //           } else if (day && month) {
  //             data = `${month}-${day}`
  //           } else {
  //             data = day
  //           }
  //           item.orWhere('p.created_at', 'like', `%${data}%`)
  //         }
  //       }
  //     })

  //     if (options.page) {
  //       const pagination = await query.paginate(options.page, options.perPage || 10);
  //       pagination['rows'] = await Promise.all(pagination['rows'].map(async (item: any) => {
  //         return {
  //           ...item,
  //           // documento: await this.#documentoRepo.findByOne([{ field: 'pessoafisica_id', value: item.id }]),
  //           coloacao: await this.#orgaoCrudBaseRepository.listarPorPessoa(item.id).then((value) => value.sigla),
  //           funcao: await this.buscarFuncao(item.id)
  //         };
  //       }));

  //       return pagination;
  //     } else {
  //       const items = await query;
  //       const all = await Promise.all(items.map(async (item: any) => {
  //         return {
  //           ...item,
  //           // documento: await this.#documentoRepo.findByOne([{ field: 'pessoafisica_id', value: item.id }]),
  //           coloacao: await this.#orgaoCrudBaseRepository.listarPorPessoa(item.id).then((value) => value.sigla),
  //           funcao: await this.buscarFuncao(item.id)
  //         };
  //       }));
  //       return all;
  //     }

  //   } catch (e) {
  //     console.log(e);
  //     return Error('Não foi possível listar os registos.');
  //   }

  // }

  public async listarTodos(options: any): Promise<any> {

    try {

      let query: DatabaseQueryBuilderContract = Database.from({ f: 'sigpq_funcionarios' })
        .select(
          Database.raw("upper(p.nome_completo) as nome_completo"),
          Database.raw("upper(pf.apelido) as apelido"),
          'f.nip',
          'f.foto_efectivo',
          'pf.foto_civil',
          'f.id',
          'regimes.quadro',
          Database.raw('upper(se.nome) as estado'),
          Database.raw('upper(sigpq_tipo_sanguineos.nome) as sanguineo'),
          Database.raw('upper(regimes.nome) as regime'),
          Database.raw("upper(patentes.nome) as patente"),
          Database.raw("upper(patentes.classe) as classe"),
          Database.raw("DATE_FORMAT(f.data_adesao, '%Y') as data_adesao"),
          Database.raw("DATE_FORMAT(f.created_at, '%d/%m/%Y %H:%i:%s') as created_at"),
          Database.raw("DATE_FORMAT(f.updated_at, '%d/%m/%Y %H:%i:%s') as updated_at")
        )
        .innerJoin('pessoas as p', 'p.id', 'f.id')
        .innerJoin('pessoafisicas as pf', 'pf.id', 'f.id')
        .innerJoin('sigpq_provimentos', 'sigpq_provimentos.pessoa_id', 'p.id')
        .innerJoin('patentes', 'patentes.id', 'sigpq_provimentos.patente_id')
        .innerJoin('sigpq_funcionario_orgaos', 'sigpq_funcionario_orgaos.pessoafisica_id', 'p.id')
        .innerJoin('pessoajuridicas as pj', 'pj.id', 'sigpq_funcionario_orgaos.pessoajuridica_id')
        .innerJoin('regimes', 'regimes.id', 'pf.regime_id')
        .innerJoin('sigpq_funcionario_estados as fe', 'fe.pessoafisica_id', 'f.id')
        .innerJoin('sigpq_situacao_estados as se', 'se.id', 'fe.sigpq_situacao_id')
        .innerJoin('sigpq_tipo_sanguineos', 'sigpq_tipo_sanguineos.id', 'f.sigpq_tipo_sanguineo_id')

        .where('sigpq_provimentos.activo', true)
        .where('sigpq_provimentos.eliminado', false)
        .where('sigpq_funcionario_orgaos.activo', true)
        .where('sigpq_funcionario_orgaos.eliminado', false)
        .where('sigpq_funcionario_orgaos.nivel_colocacao', 'muito-alto')

        .where('p.eliminado', false)
        .orderBy('p.updated_at', 'desc')

        .where((query: any) => {
          if (options.idadeMenos || options.idadeMais) {
            if (options.idadeMenos == options.idadeMais) {
              query.whereRaw(`
                  CASE 
                    WHEN DATE(pf.data_nascimento) < CURDATE() THEN
                       TIMESTAMPDIFF(YEAR, pf.data_nascimento, CURDATE()) > ${options.idadeMenos}
                  END
                `)
            } else if (options.idadeMenos < options.idadeMais) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(pf.data_nascimento) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, pf.data_nascimento, CURDATE()) >= ${options.idadeMenos} and  TIMESTAMPDIFF(YEAR, pf.data_nascimento, CURDATE()) <= ${options.idadeMais}
                END
              `)

            } else if (options.idadeMenos && !options.idadeMais) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(pf.data_nascimento) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, pf.data_nascimento, CURDATE()) >= ${options.idadeMenos}
                END
              `)


            } else if (!options.idadeMenos && options.idadeMais && options.idadeMais > 18) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(pf.data_nascimento) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, pf.data_nascimento, CURDATE()) >= 18 and TIMESTAMPDIFF(YEAR, pessoasfisicas.data_nascimentom CURDATE()) <= ${options.idadeMais}
                END
              `)

            } else if (options.idadeMenos > options.idadeMais) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(pf.data_nascimento) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, pf.data_nascimento, CURDATE()) >= ${options.idadeMais}
                END
              `)
            }
          }
        })
        .where((query: any) => {
          if (options.anoMenos || options.anoMais) {

            if (options.anoMenos == options.anoMais) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(f.data_adesao) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) = ${options.anoMenos}
                END
              `)
            } else if (options.anoMenos < options.anoMais) {

              query.whereRaw(`
                CASE 
                  WHEN DATE(f.data_adesao) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) >= ${options.anoMenos} and TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) <= ${options.anoMais}
                END
              `)

            } else if (options.anoMenos && !options.anoMais) {

              query.whereRaw(`
                CASE 
                  WHEN DATE(f.data_adesao) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) >= ${options.anoMenos}
                END
              `)

            } else if (!options.anoMenos && options.anoMais && options.anoMais > 18) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(f.data_adesao) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) >= 18 and TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) <= ${options.anoMais}
                END
              `)

            } else if (options.anoMenos > options.anoMais) {
              query.whereRaw(`
                CASE 
                  WHEN DATE(f.data_adesao) < CURDATE() THEN
                     TIMESTAMPDIFF(YEAR, f.data_adesao, CURDATE()) >= ${options.anoMenos}
                END
              `)
            }
          }
        })
        .where((query: any) => {
          if (options.regimeId) {
            query.where('pf.regime_id', Number(options.regimeId))
          }

        })
        .where((query: any) => {
          if (options.patenteId) {
            query.where('patentes.id', Number(options.patenteId))
          }
        })
        .where((query: any) => {

          if (options.tipoVinculoId) {
            query.where('f.sigpq_tipo_vinculo_id', Number(options.tipoVinculoId))
          }
        })
        .where((query: any) => {

          if (options.tipoOrgao_id) {
            query.whereLike('pj.orgao_comando_provincial', options.tipoOrgao_id)
          }
        })
        .where((query: any) => {

          if (options.orgaoId) {
            query.where('sigpq_funcionario_orgaos.pessoajuridica_id', options.orgaoId)
          }
          if (options.tipoOrgaoId) {
            query.where('pj.tipo_estrutura_organica_sigla', options.tipoOrgaoId)
          }

        })
        .where((query: any) => {
          if (options.genero) {
            query.where('pf.genero', options.genero)
          }

        })

        .where((query: any) => {
          if (options.estadoId) {
            query.where('fe.sigpq_estado_id', options.estadoId)
          }

        })
        .where((query: any) => {
          if (options.situacaoId) {
            query.where('fe.sigpq_situacao_id', options.situacaoId)
          }

        })

        .where((query: any) => {
          if (options.forcaPassiva) {
            query.where('fe.sigpq_situacao_id', '<>', options.forcaPassiva)
          }
        })

        .where((query: any) => {

          if (options.dashboard) {
            if (options.patenteClasse) {
              query.where('patentes.sigpq_tipo_carreira_id', options.patenteClasse)
            }
          }
        })

        .where(function (item: any): void {

          if (options.search) {

            item.orWhere('p.nome_completo', 'like', `%${options.search}%`)
            item.orWhere('sigpq_tipo_sanguineos.nome', 'like', `%${options.search}%`)
            item.orWhere('pf.apelido', 'like', `%${options.search}%`)
            item.orWhere('regimes.nome', 'like', `%${options.search}%`)
            item.orWhere('patentes.nome', 'like', `%${options.search}%`)
            item.orWhere('patentes.classe', 'like', `%${options.search}%`)
            item.orWhere('se.nome', 'like', `%${options.search}%`)
            item.orWhere('f.nip', 'like', `%${options.search}%`)
            item.orWhere('f.numero_processo', 'like', `%${options.search}%`)
            item.orWhere('f.numero_agente', 'like', `%${options.search}%`)
            item.orWhereRaw("concat(p.nome_completo, ' ',pf.apelido) like ?", `%${options.search}%`)

            const date = new Date(options.search);
            if (!isNaN(date.getTime())) {
              const [day, month, year] = options.search.split('/');

              let data = ""
              if (day && month && year) {
                data = `${year}-${month}-${day}`
              } else if (day && month) {
                data = `${month}-${day}`
              } else {
                data = day
              }
              item.orWhere('p.created_at', 'like', `%${data}%`)
            }
          }
        })

      if (options.page) {
        const pagination = await query.paginate(options.page, options.perPage || 10);

        pagination['rows'] = await Promise.all(pagination['rows'].map(async (item: any) => {

          return {
            ...item,
            orgao: await this.#orgaoCrudBaseRepository.listarPorPessoa(item?.id),
            funcao: await this.buscarFuncao(item.id),
            cargo: await this.buscarCargo(item.id)

          };
        }));

        return pagination;
      } else {
        const items = await query;
        const all = await Promise.all(items.map(async (item: any) => {
          return {
            ...item,
            orgao: await this.#orgaoCrudBaseRepository.listarPorPessoa(item?.id),
            funcao: await this.buscarFuncao(item.id),
            cargo: await this.buscarCargo(item.id)

          };
        }));
        return all;
      }

    } catch (e) {
      console.log(e);
      return Error('Não foi possível listar os registos.');
    }

  }



  public async listarUm(id: any): Promise<any> {

    try {

      let query: any = Database.from({ f: 'sigpq_funcionarios' })
        .select(
          Database.raw("concat(p.nome_completo, ' ',pf.apelido) as nome_agente"),
          'f.nip',
          'f.numero_agente',
          'f.foto_efectivo',
          'f.id',
          'patentes.nome as patente',
        )
        .innerJoin('pessoas as p', 'p.id', 'f.id')
        .innerJoin('pessoafisicas as pf', 'pf.id', 'f.id')
        .innerJoin('sigpq_provimentos', 'sigpq_provimentos.pessoa_id', 'p.id')
        .innerJoin('patentes', 'patentes.id', 'sigpq_provimentos.patente_id')
        .innerJoin('sigpq_funcionario_orgaos', 'sigpq_funcionario_orgaos.pessoafisica_id', 'p.id')
        .innerJoin('pessoajuridicas as pj', 'pj.id', 'sigpq_funcionario_orgaos.pessoajuridica_id')
        .where('sigpq_provimentos.activo', true)
        .where('sigpq_provimentos.eliminado', false)
        .where('sigpq_funcionario_orgaos.activo', true)
        .where('sigpq_funcionario_orgaos.eliminado', false)
        .where('p.eliminado', false)
        .where('p.id', id)
        .first()

      const item = await query;
      return {
        ...item,

        coloacao: this.#orgaoCrudBaseRepository.listarPorPessoa(id).then((value) => value.sigla),
        funcao: await this.buscarFuncao(id)

      }

    } catch (e) {
      console.log(e);
      return Error('Não foi possível listar o registo.');
    }

  }

  public async buscarFuncao(pessoaId: any): Promise<any> {
    try {
      const query = await Database.from({ f: 'sigpq_funcaos' })
        .select(Database.raw('upper(tf.nome) as nome'),
          Database.raw("DATE_FORMAT(f.created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
          Database.raw("DATE_FORMAT(f.updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
        )
        .innerJoin('sigpq_tipo_funcaos as tf', 'tf.id', 'f.sigpq_tipo_funcao_id')
        .where('f.eliminado', false)
        .where('f.pessoafisica_id', pessoaId)
        .where('f.activo', true)
        .where('f.situacao', 'actual')
        .where('f.eliminado', false)
        .first()

      return query
    } catch (e) {
      console.log(e)
      return Error('Não foi possível listar reigsto')
    }
  }
  public async buscarCargo(pessoaId: any): Promise<any> {
    try {
      const query = await Database.from({ f: 'sigpq_cargos' })
        .select(Database.raw('upper(tf.nome) as nome'),
          Database.raw("DATE_FORMAT(f.created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
          Database.raw("DATE_FORMAT(f.updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
        )
        .innerJoin('sigpq_tipo_cargos as tf', 'tf.id', 'f.sigpq_tipo_cargo_id')
        .where('f.eliminado', false)
        .where('f.pessoafisica_id', pessoaId)
        .where('f.activo', true)
        .where('f.situacao', 'actual')
        .where('f.eliminado', false)
        .first()

      return query
    } catch (e) {
      console.log(e)
      return Error('Não foi possível listar reigsto')
    }
  }
}