import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

const dataNew = [
  {
    nome_completo:
      "Departamento de Investigação dos Crimes Informáticos e Tecnológicos",
    sigla: "DICT",
    user_id: 1,
    activo: true,
    tipo_pessoajuridica_id: 2,
    orgao_comando_provincial: "Departamento",
    descricao: "Criado automaticamente pelo sistema.",
    tipo_estrutura_organica_sigla: "Departamento",
    pessoajuridica_id: 17,
  },
  {
    nome_completo:
      "Departamento de Investigação Técnica, Forense e Peritagem Digital",
    sigla: "DITFD",
    user_id: 1,
    activo: true,
    tipo_pessoajuridica_id: 2,
    orgao_comando_provincial: "Departamento",
    descricao: "Criado automaticamente pelo sistema.",
    tipo_estrutura_organica_sigla: "Departamento",
    pessoajuridica_id: 17,
  },
  {
    nome_completo: "Departamento de Gestão Administrativa",
    sigla: "DGA",
    user_id: 1,
    activo: true,
    tipo_pessoajuridica_id: 2,
    orgao_comando_provincial: "Departamento",
    descricao: "Criado automaticamente pelo sistema.",
    pessoajuridica_id: 17,
  },
];

function getPessoaObject(input: any) {
  return {
    nome_completo: input.nome_completo,
    tipo: "pj",
    activo: input.activo ? 1 : 0,
    user_id: input.user_id,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

function getPessoaJuridica(input: any, pessoaId: number) {
  return {
    id: pessoaId,
    nif: input.nif,
    sigla: input.sigla,
    user_id: input.user_id,
    pessoajuridica_id: input.pessoajuridica_id,
    tipo_pessoajuridica_id: input.tipo_pessoajuridica_id,
    orgao_comando_provincial: input.orgao_comando_provincial,
    descricao: input.descricao,
    created_at: new Date(),
    updated_at: new Date(),
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
