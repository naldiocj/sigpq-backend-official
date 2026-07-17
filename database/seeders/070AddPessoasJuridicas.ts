import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

interface PessoaJuridicaData {
  nome_completo: string;
  sigla: string;
  orgao_comando_provincial: string;
  tipo_pessoajuridica_id: number;
}

const data: PessoaJuridicaData[] = [
  // Direcções / Órgãos (tipo 1)
  {
    nome_completo: "Direcção Central de Operações",
    sigla: "DCOP",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Contra o Património",
    sigla: "DCCCPT",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo:
      "Direcção de Combate aos Crimes Económicos e Contra a Saúde Pública",
    sigla: "DCCEP",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate ao Crime Organizado",
    sigla: "DCCO",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Informáticos",
    sigla: "DCCCI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate à Corrupção",
    sigla: "DCC",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete Nacional da Interpol",
    sigla: "GNI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo:
      "Direcção de Combate ao Tráfico de Pedras, Metais Preciosos e Crimes Contra o Ambiente",
    sigla: "DCTIPMPCCA",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Investigação de Acidentes",
    sigla: "DIA",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Atendimento ao Menor em Conflito com a Lei",
    sigla: "DAMCL",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate aos Crimes Financeiros e Fiscais",
    sigla: "DCCFF",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate ao Narcotráfico",
    sigla: "DCN",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Recursos Humanos",
    sigla: "DRH",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Administração e Finanças",
    sigla: "DAF",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Educação e Moral e Patriótica",
    sigla: "DEMP",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Medicina Legal",
    sigla: "DML",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Identificação e Cadastro",
    sigla: "DIC",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Telecomunicações e Tecnologias de Informação",
    sigla: "DTTI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Direcção de Combate ao Crime Contra as Pessoas",
    sigla: "DCCCP",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete do Director Geral",
    sigla: "GDG",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete do Director Geral Adjunto",
    sigla: "GDGA",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete do Director Geral Adjunto (Lufungula)",
    sigla: "GDGL",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete do Director Geral Adjunto (Ambriz)",
    sigla: "GDGA-AMBRIZ",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Procuradoria Geral da República",
    sigla: "PGR",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Corpo de Conselheiros",
    sigla: "CC",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete de Estudos, Informação e Análise",
    sigla: "GEIA",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete Jurídico",
    sigla: "GJ",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete de Intercâmbio e Cooperação",
    sigla: "GIC",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Gabinete de Comunicação Institucional e Imprensa",
    sigla: "GCI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Laboratório Central de Criminalística",
    sigla: "LCC",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Inspecção Geral do SIC",
    sigla: "IG",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Escola de Investigação Criminal",
    sigla: "EIC",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Unidade de Investigação e Tecnológicas",
    sigla: "UIT",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Centro Médico",
    sigla: "CM",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },

  // Departamentos (tipo 1)
  {
    nome_completo: "Departamento de Asseguramento e Infra-Estruturas",
    sigla: "DAI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Departamento de Segurança Institucional",
    sigla: "DSI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Departamento de Investigação Criminal junto do Porto",
    sigla: "DICPORTO",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
  {
    nome_completo: "Departamento de Investigação Criminal junto do Aeroporto",
    sigla: "DICAEROPORTO",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
];

export default class AddPessoasJuridicasSeeder extends BaseSeeder {
  public async run() {
    const now = new Date();

    await Database.transaction(async (trx) => {
      for (const item of data) {
        const exists = await trx
          .from("pessoajuridicas")
          .where("sigla", item.sigla)
          .first();

        if (exists) {
          console.log(`[SKIP] ${item.sigla} — já existe.`);
          continue;
        }

        const [pessoaId] = await trx.table("pessoas").insert({
          nome_completo: item.nome_completo,
          tipo: "pj",
          activo: 1,
          created_at: now,
          updated_at: now,
        });

        await trx.table("pessoajuridicas").insert({
          id: pessoaId,
          sigla: item.sigla,
          nif: "000000000",
          pessoajuridica_id: null,
          tipo_pessoajuridica_id: item.tipo_pessoajuridica_id,
          orgao_comando_provincial: item.orgao_comando_provincial,
          descricao: "Criado automaticamente pelo sistema.",
          activo: 1,
          created_at: now,
          updated_at: now,
        });

        console.log(`[OK] ${item.sigla} — ${item.nome_completo}`);
      }
    });

    console.log(
      "Seed 070: Direcções/Órgãos/Departamentos registados com sucesso."
    );
  }
}
