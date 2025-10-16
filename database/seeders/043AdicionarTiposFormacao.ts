import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

const dataNew = [
  {
    nome: "Formação Inicial",
    sigla: "FI",
    descricao: "Aquisição de competências para iniciar uma profissão.",
  },
  {
    nome: "Formação Contínua",
    sigla: "FC",
    descricao:
      "Atualização e aprofundamento de competências após o ingresso no mercado.",
  },
  {
    nome: "Formação de Dupla Certificação",
    sigla: "DC",
    descricao: "Atribui certificação escolar e profissional simultaneamente.",
  },
  {
    nome: "Educação Básica",
    sigla: "EB",
    descricao: "Compreende Ensino Fundamental e Ensino Médio/Secundário.",
  },
  {
    nome: "Cursos Técnicos",
    sigla: "CT",
    descricao: "Focada em habilidades práticas para o nível médio.",
  },
  {
    nome: "Graduação (Bacharelado, Licenciatura, Tecnólogo)",
    sigla: "GRAD",
    descricao: "Nível superior de ensino.",
  },
  {
    nome: "Pós-Graduação Lato Sensu",
    sigla: "PLS",
    descricao: "Especialização ou MBA, focada no mercado de trabalho.",
  },
  {
    nome: "Pós-Graduação Stricto Sensu",
    sigla: "PSS",
    descricao: "Mestrado ou Doutorado, focado em pesquisa e docência.",
  },
  {
    nome: "Formação Profissional (Qualificação/Cursos Livres)",
    sigla: "FP",
    descricao: "Cursos de curta duração para qualificação ou requalificação.",
  },
  {
    nome: "Formação In-company",
    sigla: "IC",
    descricao: "Treinamento oferecido e realizado dentro de uma empresa.",
  },
  {
    nome: "Formação Modular Certificada",
    sigla: "FMC",
    descricao: "Formação dividida em módulos independentes.",
  },
  {
    nome: "Presencial",
    sigla: "PRES",
    descricao: "Modalidade de ensino com frequência física obrigatória.",
  },
  {
    nome: "Educação a Distância (EAD)",
    sigla: "EAD",
    descricao: "Modalidade de ensino realizada remotamente.",
  },
  {
    nome: "Híbrida",
    sigla: "HIBR",
    descricao: "Combinação de ensino presencial e a distância.",
  },
];

const now = new Date();

function getTipoFormacao(item, counter) {
  return {
    id: counter,
    nome: item.nome,
    sigla: item.sigla,
    descricao: item.descricao,
    activo: 1,
    user_id: 1,
    eliminado: false,
    created_at: now,
    updated_at: now,
  };
}

export default class extends BaseSeeder {
  public async run() {
    await Database.transaction(async (trx) => {
    
      let counter = 0
      for (const iterator of dataNew) {
        counter++
        await trx.table("sigpq_tipo_formacao").insert(getTipoFormacao(iterator, counter));
      }
    });
  }
}
