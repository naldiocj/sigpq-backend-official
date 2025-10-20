import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

const dataNew = [
  {
    nome_completo: "Departamento de Asseguramento e Infra-Estruturas",
    sigla: "DAI",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo:
      "Departamento de Investigação Criminal Junto ao Aeroporto Internacional",
    sigla: "DICA",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo:
      "Departamento de Investigação Criminal Junto ao Porto De Luanda",
    sigla: "DICPL",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Departamento de Segurança Institucional",
    sigla: "DSI",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Unidade de Investigação Tecnológica",
    sigla: "UIT",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
];

function getPessoaObject(iterator: any) {
  return {
    nome_completo: iterator.nome_completo,
    tipo: "pj",
    user_id: iterator.user_id,
  };
}

function getPessoaJuridica(iterator: any, pessoaId: number) {
  return {
    id: pessoaId,
    sigla: iterator.sigla,
    pessoajuridica_id: null,
    tipo_pessoajuridica_id: 1,
    activo: 1,
    descricao: iterator.descricao,
    orgao_comando_provincial: iterator.orgao_comando_provincial,
  };
}

export default class extends BaseSeeder {
  public async run() {
    await Database.transaction(async (trx) => {
      for (const iterator of dataNew) {
        const [pessoaId] = await trx
          .table("pessoas")
          .insert(getPessoaObject(iterator));

        await trx
          .table("pessoajuridicas")
          .insert(getPessoaJuridica(iterator, pessoaId));
      }
    });

    console.log("Órgãos ou comandos registados com sucesso.");
  }
}
