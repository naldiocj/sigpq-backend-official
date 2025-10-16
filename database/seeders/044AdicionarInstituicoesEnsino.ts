import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

// =================================================================
// 1. INSTITUIÇÕES DE ENSINO DE ANGOLA (Ampla Abrangência)
// Lista representativa dos principais Colégios, Institutos e Universidades
// =================================================================
const instituicoesEnsinoAngola = [
  // A. INSTITUIÇÕES DE ENSINO SUPERIOR (NÍVEL: 6 - Graduação)
  // Públicas
  { nome: "Universidade Agostinho Neto", sigla: "UAN", descricao: "Maior universidade pública de Luanda.", tipo_formacao_id: 6 },
  { nome: "Universidade de Luanda", sigla: "UniLuanda", descricao: "Universidade pública na capital, Região I.", tipo_formacao_id: 6 },
  { nome: "Universidade José Eduardo dos Santos", sigla: "UJES", descricao: "Universidade pública no Huambo.", tipo_formacao_id: 6 },
  { nome: "Universidade Mandume ya Ndemufayo", sigla: "UMyN", descricao: "Universidade pública na Huíla (Lubango).", tipo_formacao_id: 6 },
  { nome: "Universidade Katyavala Bwila", sigla: "UKB", descricao: "Universidade pública em Benguela.", tipo_formacao_id: 6 },
  // Privadas (IES)
  { nome: "Universidade Católica de Angola", sigla: "UCAN", descricao: "Universidade privada de referência em Luanda.", tipo_formacao_id: 6 },
  { nome: "Universidade Jean Piaget de Angola", sigla: "UniPiaget", descricao: "Universidade privada com campus em Luanda e Benguela.", tipo_formacao_id: 6 },
  { nome: "Universidade Técnica de Angola", sigla: "UTANGA", descricao: "Universidade privada com foco em Engenharia.", tipo_formacao_id: 6 },
  { nome: "Instituto Superior Politécnico de Tecnologias e Ciências", sigla: "ISPTEC", descricao: "Instituto privado de ensino superior.", tipo_formacao_id: 6 },
  { nome: "Instituto Superior Técnico de Angola", sigla: "ISTA", descricao: "Instituto privado de ensino superior.", tipo_formacao_id: 6 },
  { nome: "Instituto Superior de Ciências da Educação de Luanda", sigla: "ISCED-Luanda", descricao: "Instituto Superior público, foco em formação de professores.", tipo_formacao_id: 6 },
  
  // B. INSTITUIÇÕES DE ENSINO MÉDIO/TÉCNICO (NÍVEL: 5 - Cursos Técnicos)
  { nome: "Instituto Médio Politécnico Alda Lara", sigla: "IMAL", descricao: "Instituto Médio Politécnico, Luanda.", tipo_formacao_id: 5 },
  { nome: "Instituto Médio Industrial de Luanda", sigla: "IMIL", descricao: "Principal Instituto Industrial público de Luanda.", tipo_formacao_id: 5 },
  { nome: "Instituto Nacional de Administração e Gestão", sigla: "INAG", descricao: "Instituto Médio de formação em gestão e administração.", tipo_formacao_id: 5 },
  { nome: "Instituto Médio Agrário de Malanje", sigla: "IMA-Malanje", descricao: "Instituto Médio focado em Ciências Agrárias.", tipo_formacao_id: 5 },
  { nome: "Escola Nacional de Saúde Pública", sigla: "ENSP", descricao: "Oferece cursos técnicos na área de saúde pública.", tipo_formacao_id: 5 },
  
  // C. ESCOLAS/COLÉGIOS (NÍVEL: 4 - Educação Básica)
  { nome: "Escola Portuguesa de Luanda - CELP", sigla: "CELP", descricao: "Escola de referência com currículo português em Luanda.", tipo_formacao_id: 4 },
  { nome: "Colégio Atlântico", sigla: "CA", descricao: "Colégio privado de referência em Luanda.", tipo_formacao_id: 4 },
  { nome: "Colégio Kaluanda", sigla: "CK", descricao: "Colégio privado de Luanda.", tipo_formacao_id: 4 },
  { nome: "Complexo Escolar Anexo - UAN", sigla: "CEA-UAN", descricao: "Escola pública/complexo anexo à UAN.", tipo_formacao_id: 4 },
  { nome: "Colégio Infante Santo", sigla: "CIS", descricao: "Colégio privado de referência em Luanda.", tipo_formacao_id: 4 },
  { nome: "Escola Primária N.º 32", sigla: "EP32", descricao: "Exemplo de escola pública do ensino primário no Huambo.", tipo_formacao_id: 4 },
  { nome: "Colégio Dante Alighieri", sigla: "CDA", descricao: "Colégio privado em Luanda.", tipo_formacao_id: 4 },
];

// =================================================================
// 2. LÓGICA DO SEEDER
// =================================================================

export default class InstituicaoEnsinoSeeder extends BaseSeeder {
  // Ajuste o nome da tabela conforme o seu banco de dados
  protected tableName = "sigpq_instituicao_de_ensino";

  private getInstituicaoEnsino(item, counter, now) {
    return {
      id: counter,
      nome: item.nome,
      sigla: item.sigla,
      descricao: item.descricao,
      activo: true,
      user_id: 1, // ID do utilizador padrão
      tipo_formacao_id: item.tipo_formacao_id, // Campo adicionado
      eliminado: false,
      created_at: now,
      updated_at: now,
    };
  }

  public async run() {
    const now = new Date();

    await Database.transaction(async (trx) => {
      let counter = 0;
      
      // Itera sobre a lista e insere no banco de dados
      for (const iterator of instituicoesEnsinoAngola) {
        counter++;
        const record = this.getInstituicaoEnsino(iterator, counter, now);
        
        // Insere o registro usando a transação
        await trx.table(this.tableName).insert(record);
      }
    });
  }
}