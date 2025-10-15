import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

const dataNew = [
  {
    nome_completo: "Direcção Geral",
    sigla: "DG",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Financeiros e Fiscais",
    sigla: "DCCFF",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Informáticos",
    sigla: "DCCI",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate ao Narcotráfico",
    sigla: "DCN",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Inteligência Criminal",
    sigla: "DINTEL",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Informáticos",
    sigla: "DCCI",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Investigação de Acidentes",
    sigla: "DIAC",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Educação Patriótica",
    sigla: "DEP",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Telecomunicações e Tecnologias de Informação",
    sigla: "DTTI",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate aos Crimes de Corrupção",
    sigla: "DCCC",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo:
      "Direcção de Combate ao Tráfico Ilícito de Pedras, Metais Preciosos e Crimes Ambientais",
    sigla: "DCTIPMPCA",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção Central de Operações",
    sigla: "DCO",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Contra o Património",
    sigla: "DCCCPT",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Administração e Finanças",
    sigla: "DAF",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Atendimento ao Menor em Conflito Com a Lei",
    sigla: "DANMCL",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate ao Crime Organizado",
    sigla: "DCCO",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Contra as Pessoas",
    sigla: "DCCCPS",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo:
      "Direcção de Combate aos Crimes Económicos e Contra a Saúde Pública",
    sigla: "DCCECSP",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Identificação e Cadastro",
    sigla: "DIC",
    orgao_comando_provincial: "Orgão",
    user_id: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome_completo: "Direcção de Medicina Legal",
    sigla: "DML",
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
