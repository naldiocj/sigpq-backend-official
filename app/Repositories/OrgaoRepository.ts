import Database from '@ioc:Adonis/Lucid/Database'
// import NotCreatedException from 'App/Exceptions/NotCreatedException'
// import NotUpdateException from 'App/Exceptions/NotUpdateException'
// import NotFoundException from 'App/Exceptions/NotFoundException'

export default class OrgaoRepository {

    // public async findAll(options: any): Promise<any> {

    //     try {

    //         let query: DatabaseQueryBuilderContract = Database.from({ r: 'roles' })
    //             .select(
    //                 'r.*',
    //                 'm.nome as modulo_nome',
    //                 'm.sigla as modulo_sigla',
    //                 Database.raw("DATE_FORMAT(r.created_at, '%d/%m/%Y %H:%i:%s') as createdAt"),
    //                 Database.raw("DATE_FORMAT(r.updated_at, '%d/%m/%Y %H:%i:%s') as updatedAt")
    //             )
    //             .innerJoin('modulos as m', 'm.id', 'r.modulo_id')

    //         if (options.modulo) {
    //             query.where('r.modulo_id', options.modulo)
    //         }

    //         query.where('r.eliminado', false)
    //             .orderBy('r.name', 'asc')
    //             .where(function (item) {
    //                 if (options.search) {
    //                     item.orWhere('r.nome', 'like', `%${options.search}%`)
    //                 }
    //             }).clone()

    //         return options.page
    //             ? await query.paginate(options.page, options.perPage || 10)
    //             : await query
    //     } catch (e) {
    //         console.log(e)
    //         throw new NotFoundException('Não foi possível listar!')
    //     }
    // }

    public async findOrgaoDaPessoa(pessoa_id: number) {

        try {

            const orgaoPessoa = await Database
                .query()
                .from({ fpo: 'sigpq_funcionario_orgaos' })
                .select(
                    'p.id',
                    'p.nome_completo',
                    'pf.sigla',
                    'fpo.pessoajuridica_id'
                )
                .innerJoin('pessoas as p', 'p.id', 'fpo.pessoajuridica_id')
                .innerJoin('pessoajuridicas as pf', 'pf.id', 'p.id')
                .where('fpo.pessoafisica_id', pessoa_id)
                .where('fpo.activo', true)
                .where('fpo.eliminado', false)
                .first()



            return orgaoPessoa

        } catch (e) {
            console.log(e);
            return null
            // throw new NotFoundException('Não foi possível o orgao!')
        }
    }

    public async findSecaoEEsquadraDaPessoa(pessoa_id: number) {

      try {

        const sigpq_departamento = await Database.from({ f: 'sigpq_funcionario_orgaos' })
        .select(
          '*',
          Database.raw("DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as created_at"),
          Database.raw("DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updated_at")
        )
        .where('pessoafisica_id', pessoa_id)
        .where('activo', true)
        .where('nivel_colocacao', 'alto')
        .where('eliminado', false)
        .first()

      const sigpq_tipo_departamento = sigpq_departamento ? await Database.from({ p: 'pessoas' })
      .select(
        'p.id',
        'p.nome_completo',
        //'p.sigla'
      )
        .innerJoin('pessoajuridicas as pj', 'pj.id', 'p.id')
        .where('p.id', sigpq_departamento.pessoajuridica_id)
        .first() : null

                const sigpq_seccao = await Database.from({ f: 'sigpq_funcionario_orgaos' })
                  .select(
                    '*',
                    Database.raw("DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as created_at"),
                    Database.raw("DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updated_at")
                  )
                  .where('pessoafisica_id', pessoa_id)
                  .where('activo', true)
                  .where('nivel_colocacao', 'medio')
                  .where('eliminado', false)
                  .first()

                  const sigpq_tipo_seccao = sigpq_seccao ? await Database.from({ p: 'pessoas' })
                    .select(
                      'p.id',
                      'p.nome_completo',
                      //'p.sigla'
                    )
                    .innerJoin('pessoajuridicas as pj', 'pj.id', 'p.id')
                    .where('p.id', sigpq_seccao.pessoajuridica_id)
                    .first() : null

                    const posto_policial = await Database.from({ f: 'sigpq_funcionario_orgaos' })
                    .select(
                      '*',
                      Database.raw("DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as created_at"),
                      Database.raw("DATE_FORMAT(updated_at, '%d/%m/%Y %H:%i:%s') as updated_at")
                    )
                    .where('pessoafisica_id', pessoa_id)
                    .where('activo', true)
                    .where('nivel_colocacao', 'baixo')
                    .where('eliminado', false)
                    .first()

                  const sigpq_tipo_posto = posto_policial ? await Database.from({ p: 'pessoas' })
                    .select(
                    'p.id',
                    'p.nome_completo',
                    //'p.sigla'
                    )
                    .innerJoin('pessoajuridicas as pj', 'pj.id', 'p.id')
                    .where('p.id', posto_policial.pessoajuridica_id)
                    .first() : null

          return {
            sigpq_tipo_departamento,
            sigpq_tipo_seccao,sigpq_tipo_posto
          }

      } catch (e) {
          console.log(e);
          return null
          // throw new NotFoundException('Não foi possível o orgao!')
      }
  }


}
