import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {

  #tabela: string = 'pessoajuridicas'

  public async run() {
    const trx = await Database.transaction()
    try {

      await Database.from(this.#tabela).useTransaction(trx).whereNull('pessoajuridica_id').where('orgao_comando_provincial', 'Comando Provincial').where('tipo_pessoajuridica_id', 1).update('tipo_estrutura_organica_sigla', 'UT')

      // await Database.from(this.#tabela).useTransaction(trx).where('sigla', 'like', `D%`).whereNull('pessoajuridica_id').where('orgao_comando_provincial', 'Orgão').update('tipo_estrutura_organica_sigla', 'UC')
      // await Database.from(this.#tabela).useTransaction(trx).where('sigla', 'like', `GAB%`).whereNull('pessoajuridica_id').where('orgao_comando_provincial', 'Orgão').update('tipo_estrutura_organica_sigla', 'UC')

      const pessoajuridicas: any[] = []

      const apioTecnicos = [
        { dirSigla: 'DTTI', sigla: 'SAT' }, { dirSigla: 'DPQ', sigla: 'SAT' },
        { dirSigla: 'IPNA', sigla: 'SAT' }, { dirSigla: 'DISPO', sigla: 'SAT' },
        { dirSigla: 'DEPAT', sigla: 'SAT' }, { dirSigla: 'DCII', sigla: 'SAT' },
        { dirSigla: 'DTSR', sigla: 'SAT' }, { dirSigla: 'DINFOP', sigla: 'SAT' },
        { dirSigla: 'DIF', sigla: 'SAT' }, { dirSigla: 'DL', sigla: 'SAT' },
        { dirSigla: 'DT', sigla: 'SAT' }, { dirSigla: 'DIE', sigla: 'SAT' },
        { dirSigla: 'DSS', sigla: 'SAT' }, { dirSigla: 'DAS', sigla: 'SAT' },
        { dirSigla: 'DIC', sigla: 'SAT' }, { dirSigla: 'DAJ', sigla: 'SAT' },
        { dirSigla: 'DEP', sigla: 'SAT' },
      ]
      const serviceInstrumental = [
        { dirSigla: 'GAB.CMDTE GERAL', sigla: 'SAI' },
        { dirSigla: 'GAB. 2.º CMDTE GERAL', sigla: 'SAI' },
        { dirSigla: 'GAB. 2.ºCMDTE GERAL', sigla: 'SAI' },
        { dirSigla: 'C.C', sigla: 'SAI' },
      ]

      const orgDoutrinaEnsino = [
        { dirSigla: 'DEPOL', sigla: 'ODEP' },
        { dirSigla: 'ISCPC. 2.º CMDTE GERAL', sigla: 'ODEP' },
        { dirSigla: 'AP', sigla: 'ODEP' },
        { dirSigla: 'EPP', sigla: 'ODEP' },
        { dirSigla: 'CFACC', sigla: 'ODEP' },
        { dirSigla: 'CFACC', sigla: 'ODEP' },
        { dirSigla: 'CP', sigla: 'ODEP' },
      ]
      const orgUnidadesCentrais = [
        { dirSigla: 'PIR', sigla: 'UC' },
        { dirSigla: 'PFA', sigla: 'UC' },
        { dirSigla: 'PGF', sigla: 'UC' },
        { dirSigla: 'PSPEP', sigla: 'UC' },
        { dirSigla: 'PSOE', sigla: 'UC' },
        { dirSigla: 'DIIP', sigla: 'UC' },
        { dirSigla: 'UAv', sigla: 'UC' },
        { dirSigla: 'UAv', sigla: 'UC' },
      ]
      pessoajuridicas.push(...apioTecnicos, ...serviceInstrumental, ...orgDoutrinaEnsino, ...orgUnidadesCentrais)

      for (let item of pessoajuridicas) {
        await Database.from(this.#tabela).where('sigla', item.dirSigla).whereNull('pessoajuridica_id').useTransaction(trx).update({
          tipo_estrutura_organica_sigla: item.sigla
        })
      }
      await trx.commit()

    } catch (e) {
      await trx.rollback()
      console.log(e)
    }
  }
}
