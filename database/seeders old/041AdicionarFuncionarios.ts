import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

import { DateTime } from "luxon";

const {
  gerarUnicoNumeroParaProcesso,
} = require("App/@piips/shared/metodo-generico/Gerar-Numero-Unico");
// const {
//   extensao_ordem,
//   extensao_despacho,
// } = require("App/@piips/shared/metodo-generico/Buscar-Data-Extensao");

import { faker } from "@faker-js/faker/locale/pt_BR";

// // Funções utilitárias (adapte conforme necessário para o seu ambiente)
// // Estas são meramente mockadas para simular as suas funções originais
// const extensao_ordem = (data: Date, numero: string) =>
//   `Ordem N.º ${numero}/${data.getFullYear()}`;
// const extensao_despacho = (data: Date, numero: string) =>
//   `Despacho N.º ${numero}/${data.getFullYear()}`;
// const gerarUnicoNumeroParaProcesso = (numero: number) =>
//   `PROC-${String(numero).padStart(5, "0")}`;

function gerarIbanAO() {
  // Códigos de Bancos Angolanos reais (primeiros 4 dígitos após o AO06)
  const codigosBancosAngola = [
    "0040", // BAI
    "0051", // BIC
    "0006", // BFA
    "0044", // Banco SOL
    "0010", // BPC
    "0055", // BPA (Atlântico)
  ];

  // 1. Prefixo Fixo: Código do País e Dígitos de Controlo
  const prefixo = "AO06"; // 4 caracteres

  // 2. Código do Banco (4 dígitos): Seleciona um código de banco aleatório
  const codigoBanco =
    codigosBancosAngola[Math.floor(Math.random() * codigosBancosAngola.length)]; // 4 caracteres

  // 3. Código da Agência (4 dígitos): Mantido como '0000' para simplificar, como é comum
  const codigoAgencia = "0000"; // 4 caracteres

  // 4. Número da Conta e Dígitos de Controlo (13 dígitos restantes):
  // Gera 13 dígitos numéricos aleatórios.
  let contaCompleta = "";
  for (let i = 0; i < 13; i++) {
    contaCompleta += Math.floor(Math.random() * 10).toString();
  } // 13 caracteres

  // 5. Monta o IBAN
  const ibanAO = prefixo + codigoBanco + codigoAgencia + contaCompleta;

  // Verificação de comprimento (deve ser 25)
  if (ibanAO.length !== 25) {
    // Isso só ocorreria se o código fosse alterado.
    throw new Error("Erro na geração: IBAN Angolano deve ter 25 caracteres.");
  }

  return ibanAO;
}

export default class extends BaseSeeder {
  public async run() {
    // É importante usar uma transação para inserções em múltiplas tabelas
    const trx = await Database.transaction();
    const dateTime = DateTime.now();

    try {
      const NUM_FUNCIONARIOS = 100;
      let pessoaIdCounter = 120; // Simula o ID da pessoa, ajuste se já houver dados

      // Array para armazenar os IDs das Pessoas (simulando o retorno da inserção)
      const pessoaIds: number[] = [];

      for (let i = 0; i < NUM_FUNCIONARIOS; i++) {
        pessoaIdCounter++;
        // pessoaIds.push(pessoaId);

        // --- Dados base e mocks para o Input/Formulário ---
        const nome = faker.person.firstName();
        const apelido = faker.person.lastName();
        const nome_completo = `${nome} ${apelido}`;
        const numeroAutomatico = i + 1001; // Número de processo fictício

        const input = {
          nome_completo: nome_completo,
          email: faker.internet
            .email({ firstName: nome, lastName: apelido })
            .toLowerCase(),
          activo: faker.helpers.arrayElement([true, false]),
          patente_id: faker.number.int({ min: 1, max: 10 }), // Exemplo
          data_ordem: faker.date.past({ years: 5 }),
          numero_ordem: faker.number.int({ min: 100, max: 999 }).toString(),
          regime_id: faker.helpers.arrayElement([1, 2]), // 1 = Ordem, 2 = Despacho
          data_despacho: faker.date.past({ years: 3 }),
          numero_despacho: faker.number.int({ min: 10, max: 99 }).toString(),
          sigpq_acto_progressao_id: faker.helpers.arrayElement([1, 2, 3]),
          user_id: 1, // ID de usuário fixo para o seed
          sigpq_tipo_cargo_id: faker.number.int({ min: 1, max: 5 }), // Exemplo
          orgao_id: faker.number.int({ min: 1, max: 50 }), // Exemplo
          sigpq_acto_nomeacao_id: faker.number.int({ min: 1, max: 5 }), // Exemplo
          data_despacho_nomeacao: faker.date.past({ years: 2 }),
          numero_despacho_nomeacao: faker.number
            .int({ min: 1000, max: 9999 })
            .toString(),
          sigpq_tipo_funcao_id: faker.helpers.arrayElement([0, 1, 2, 3]), // 0 para não ter
          nip: faker.string.alphanumeric(8).toUpperCase(),
          nps: faker.string.alphanumeric(10).toUpperCase(),
          pseudonimo: faker.datatype.boolean()
            ? faker.internet.username()
            : null,
          numero_agente: faker.string.alphanumeric(6).toUpperCase(),
          sigpq_tipo_vinculo_id: faker.number.int({ min: 1, max: 5 }), // Exemplo
          sigpq_tipo_sanguineo_id: faker.number.int({ min: 1, max: 8 }), // Exemplo
          data_adesao: faker.date.past({ years: 10 }),
          descricao: faker.lorem.sentence(),
          residencia_bi: faker.location.streetAddress(true),
          residencia_actual: faker.datatype.boolean()
            ? faker.location.streetAddress(true)
            : null,
          sigpq_situacao_id: faker.number.int({ min: 1, max: 5 }), // Exemplo
          sigpq_estado_id: faker.helpers.arrayElement([null, 1, 2]), // Exemplo
          sigpq_estado_reforma_id: faker.helpers.arrayElement([null, 1, 2]), // Exemplo
          numero_guia: faker.datatype.boolean()
            ? faker.string.alphanumeric(7).toUpperCase()
            : null,
          departamento_id: faker.datatype.boolean()
            ? faker.number.int({ min: 51, max: 100 })
            : null,
          seccao_id: faker.datatype.boolean()
            ? faker.number.int({ min: 101, max: 150 })
            : null,
          posto_id: faker.datatype.boolean()
            ? faker.number.int({ min: 151, max: 200 })
            : null,
          sigpq_tipo_curso_id: faker.datatype.boolean()
            ? faker.number.int({ min: 1, max: 10 })
            : null,
          sigpq_tipo_categoria_id: faker.datatype.boolean()
            ? faker.number.int({ min: 1, max: 5 })
            : null,
          data_expira: faker.date
            .future({ years: 10 })
            .toISOString()
            .split("T")[0],
          data_emissao: faker.date
            .past({ years: 5 })
            .toISOString()
            .split("T")[0],
        };

        const dataNascimento = faker.date.birthdate({
          min: 18,
          max: 60,
          mode: "age",
        });
        const genero = faker.person.sexType() === "female" ? "F" : "M";
        // const estadoCivil = faker.helpers.arrayElement([
        //   "Solteiro",
        //   "Casado",
        //   "Divorciado",
        // ]);

        // --- 1. Inserir na tabela 'pessoas' (pessoa) ---
        const pessoaData = {
          nome_completo: input.nome_completo,
          tipo: "pf",
          activo: input.activo,
          user_id: input.user_id,
          email_pessoal: input.email,
        };
        const [pessoaId] = await Database.insertQuery()
          .table("pessoas")
          // .useTransaction(trx)
          .insert(pessoaData);

        // --- 2. Inserir na tabela 'pessoafisicas' (pessoaFisica) ---
        const pessoaFisicaData = {
          id: pessoaId,
          foto_civil: "sem foto",
          estado: 1,
          apelido: apelido,
          genero: genero,
          nome_mae: faker.person.fullName({ sex: "female" }),
          nome_pai: faker.person.fullName({ sex: "male" }),
          iban: gerarIbanAO(),
          data_nascimento: dataNascimento.toISOString().split("T")[0],
          nacionalidade_id: 1, // Exemplo: 1 para Angola
          naturalidade_id: faker.number.int({ min: 1, max: 18 }), // Exemplo de província
          estado_civil_id: 1,
          local_nascimento: "Luanda",
          municipio_id: 108,
          distrito_id: null,
          regime_id: 1,
        };

        await Database.insertQuery()
          .table("pessoafisicas")
          // .useTransaction(trx) // Aplica a transação
          .insert(pessoaFisicaData);

        const pessoaFisica = await Database.from("pessoafisicas")
          .where("id", pessoaId)
          .first();

        const pessoaFisicaId = pessoaFisica;

        // --- 3. Inserir Documentos (BI/NID, Carta de Condução, Passaporte) ---
        if (pessoaFisica != null && pessoaFisica.id != null) {
          const nid = faker.string.alphanumeric(14).toUpperCase();
          const passaporte_nid = faker.string.alphanumeric(9).toUpperCase();
          const carta_conducao_nid = faker.string.alphanumeric(9).toUpperCase();

          // Datas de Emissão e Expiração
          const data_emissao_bi = faker.date
            .past({ years: 5 })
            .toISOString()
            .split("T")[0];
          // BI e Carta de Condução: Validade de 5 anos (simulação)
          const data_expira_bi = faker.date
            .future({ years: 5 })
            .toISOString()
            .split("T")[0];
          // Passaporte: Validade de 10 anos (simulação)
          const data_expira_passaporte = faker.date
            .future({ years: 10 })
            .toISOString()
            .split("T")[0];

          // const documentos = [
          //   // Documento (BI/NID - sigpq_tipo_documento_id: 1)
          //   {
          //     nid: nid,
          //     pessoafisica_id: pessoaFisicaId,
          //     user_id: 1,
          //     sigpq_tipo_documento_id: 1,
          //     data_expira: data_expira_bi,
          //     local_emissao: "Luanda",
          //     data_emissao: data_expira_bi,
          //   },
          //   // Carta Condução (sigpq_tipo_documento_id: 2)
          //   {
          //     nid: carta_conducao_nid,
          //     pessoafisica_id: pessoaFisicaId,
          //     user_id: 1,
          //     sigpq_tipo_documento_id: 2,
          //     data_expira: data_emissao_bi,
          //     local_emissao: "Luanda",
          //     data_emissao: data_expira_passaporte,
          //   },
          //   // Passaporte (sigpq_tipo_documento_id: 4)
          //   {
          //     nid: passaporte_nid,
          //     pessoafisica_id: pessoaFisicaId,
          //     user_id: 1,
          //     sigpq_tipo_documento_id: 4,
          //     data_expira: data_emissao_bi,
          //     local_emissao: "Luanda",
          //     data_emissao: data_expira_bi,
          //   },
          // ];
          // await Database.insertQuery()
          //   .table("sigpq_documentos")
          //   .useTransaction(trx)
          //   .insert(documentos);

          // Busca o ID do passaporte inserido para o campo `sigpq_documento_id`
          // Isso é uma simulação, num cenário real, teria que ser feito com o resultado da inserção
          const resultadoPassaporte = [pessoaId * 10 + 3]; // Simulação: o ID do passaporte

          // --- 4. Inserir Contactos ---
          // const contactos = [
          //   {
          //     contacto: faker.phone.number(),
          //     pessoa_id: pessoaId,
          //     sigpq_tipo_contacto_id: 1, // Telefone Principal
          //     user_id: 1,
          //     descricao: "Gerado pelo sistema",
          //   },
          //   {
          //     contacto: faker.phone.number(),
          //     pessoa_id: pessoaId,
          //     sigpq_tipo_contacto_id: 1, // Telefone Alternativo
          //     user_id: 1,
          //     descricao: "Telefone alternativo",
          //   },
          //   {
          //     contacto: faker.phone.number(),
          //     pessoa_id: pessoaId,
          //     sigpq_tipo_contacto_id: 1, // Telefone de Serviço
          //     user_id: 1,
          //     descricao: "Telefone de serviço",
          //   },
          // ];
          // await Database.insertQuery()
          //   .table("sigpq_contactos")
          //   .useTransaction(trx)
          //   .insert(contactos);

          // // --- 5. Inserir Provimento ---
          // const provimento = {
          //   pessoa_id: pessoaId,
          //   patente_id: input.patente_id,
          //   data_provimento: input.data_ordem.toISOString().split("T")[0],
          //   ordem_data: input.data_ordem.toISOString().split("T")[0],
          //   ordem_descricao:
          //     input.regime_id === 1
          //       ? extensao_ordem(input.data_ordem, input.numero_ordem)
          //       : null,
          //   despacho_descricao:
          //     input.regime_id === 2
          //       ? extensao_despacho(input.data_despacho, input.numero_despacho)
          //       : null,
          //   despacho_data: input.data_despacho.toISOString().split("T")[0],
          //   numero_despacho:
          //     input.regime_id === 2 ? input.numero_despacho : null,
          //   numero_ordem: input.regime_id === 1 ? input.numero_ordem : null,
          //   acto_progressao_id: input.sigpq_acto_progressao_id,
          //   user_id: input.user_id,
          // };
          // await Database.insertQuery()
          //   .table("sigpq_provimentos")
          //   .useTransaction(trx)
          //   .insert(provimento);

          // // --- 6. Inserir Cargo (sigpq_cargos) ---
          // const sigpq_cargo = {
          //   sigpq_tipo_cargo_id: input.sigpq_tipo_cargo_id,
          //   pessoafisica_id: pessoaFisicaId,
          //   pessoajuridica_id: input.orgao_id,
          //   patente_id: input.patente_id,
          //   numero_despacho: input.numero_despacho_nomeacao
          //     ? extensao_despacho(
          //         input.data_despacho_nomeacao,
          //         input.numero_despacho_nomeacao
          //       )
          //     : null,
          //   numero_ordem: input.numero_despacho_nomeacao,
          //   sigpq_acto_nomeacao_id: input.sigpq_acto_nomeacao_id,
          //   sigpq_documento_id: resultadoPassaporte[0],
          //   situacao: "actual",
          //   data: input.data_despacho_nomeacao.toISOString().split("T")[0],
          //   user_id: input.user_id,
          //   created_at: dateTime,
          //   updated_at: dateTime,
          // };
          // await Database.insertQuery()
          //   .table("sigpq_cargos")
          //   .useTransaction(trx)
          //   .insert(sigpq_cargo);

          // --- 7. Inserir Função (sigpq_funcaos) - Condicional ---
          // if (input.sigpq_tipo_funcao_id) {
          //   const sigpq_funcao = {
          //     sigpq_tipo_funcao_id: input.sigpq_tipo_funcao_id,
          //     pessoafisica_id: pessoaFisicaId,
          //     pessoajuridica_id: input.orgao_id,
          //     patente_id: input.patente_id,
          //     situacao: "actual",
          //     user_id: input.user_id,
          //     created_at: dateTime,
          //     updated_at: dateTime,
          //   };
          //   await Database.insertQuery()
          //     .table("sigpq_funcaos")
          //     .useTransaction(trx)
          //     .insert(sigpq_funcao);
          // }

          // --- 8. Inserir Funcionário (sigpq_funcionarios) ---
          const funcionario = {
            nip: input.nip,
            nps: input.nps,
            numero_processo: gerarUnicoNumeroParaProcesso(numeroAutomatico),
            pseudonimo: input.pseudonimo,
            numero_agente: input.numero_agente,
            foto_efectivo: "sem foto",
            sigpq_tipo_vinculo_id: input.sigpq_tipo_vinculo_id,
            sigpq_tipo_sanguineo_id: input.sigpq_tipo_sanguineo_id,
            data_adesao: input.data_adesao.toISOString().split("T")[0],
            descricao: input.descricao,
            created_at: dateTime,
            updated_at: dateTime,
          };

          await Database.insertQuery()
            .table("sigpq_funcionarios")
            .useTransaction(trx)
            .insert(funcionario);

          // --- 9. Simulação de Passes (pode ser ignorado se não for essencial para o seed) ---
          // O trecho original usa um repositório, que não pode ser simulado aqui.
          // Apenas para fins de SEED, vamos ignorar a lógica complexa do passe.

          // --- 10. Endereço BI (sigpq_enderecos) ---
          const enderecoBi = {
            residencia_actual: input.residencia_bi,
            pessoa_id: pessoaId,
            user_id: input.user_id,
            created_at: dateTime,
            updated_at: dateTime,
          };
          await Database.insertQuery()
            .table("sigpq_enderecos")
            .useTransaction(trx)
            .insert(enderecoBi);

          // // --- 11. Endereço Atual (sigpq_enderecos) - Condicional ---
          // if (input.residencia_actual) {
          //   const residenciaActual = {
          //     residencia_actual: input.residencia_actual,
          //     pessoa_id: pessoaId,
          //     user_id: input.user_id,
          //     created_at: dateTime,
          //     updated_at: dateTime,
          //   };
          //   await Database.insertQuery()
          //     .table("sigpq_enderecos")
          //     .useTransaction(trx)
          //     .insert(residenciaActual);
          // }

          // // --- 12. Estado do Funcionário (sigpq_funcionario_estados) - Condicional ---
          // if (input.sigpq_situacao_id) {
          //   const estadoFuncionario = {
          //     pessoafisica_id: pessoaFisicaId,
          //     sigpq_situacao_id: input.sigpq_situacao_id,
          //     sigpq_estado_id: input.sigpq_estado_id,
          //     sigpq_estado_reforma_id: input.sigpq_estado_reforma_id,
          //     created_at: dateTime,
          //     updated_at: dateTime,
          //   };
          //   await Database.insertQuery()
          //     .table("sigpq_funcionario_estados")
          //     .useTransaction(trx)
          //     .insert(estadoFuncionario);
          // }

          // // --- 13. Colocação no Órgão Principal (sigpq_funcionario_orgaos) ---
          // const orgao_colocado_principal = {
          //   pessoajuridica_id: input.orgao_id,
          //   pessoafisica_id: pessoaFisicaId,
          //   numero_guia: input.numero_guia,
          //   despacho: input.numero_despacho,
          //   despacho_descricao: input.numero_despacho
          //     ? extensao_despacho(input.data_despacho, input.numero_despacho)
          //     : null,
          //   despacho_data: input.data_despacho.toISOString().split("T")[0],
          //   situacao: "actual",
          //   user_id: input.user_id,
          //   nivel_colocacao: "muito-alto",
          //   created_at: dateTime,
          //   updated_at: dateTime,
          // };
          // await Database.insertQuery()
          //   .table("sigpq_funcionario_orgaos")
          //   .useTransaction(trx)
          //   .insert(orgao_colocado_principal);

          // // --- 14. Colocação em Departamentos, Secções e Postos (Condicional) ---
          // const niveisColocacao = [
          //   { id: input.departamento_id, nivel: "alto" },
          //   { id: input.seccao_id, nivel: "medio" },
          //   { id: input.posto_id, nivel: "baixo" },
          // ];

          // for (const item of niveisColocacao) {
          //   if (item.id) {
          //     const orgao_colocado_secundario = {
          //       pessoajuridica_id: item.id,
          //       pessoafisica_id: pessoaFisicaId,
          //       numero_guia: input.numero_guia,
          //       despacho: input.numero_despacho,
          //       despacho_descricao: input.numero_despacho
          //         ? extensao_despacho(
          //             input.data_despacho,
          //             input.numero_despacho
          //           )
          //         : null,
          //       despacho_data: input.data_despacho.toISOString().split("T")[0],
          //       situacao: "actual",
          //       nivel_colocacao: item.nivel,
          //       user_id: input.user_id,
          //       created_at: dateTime,
          //       updated_at: dateTime,
          //     };
          //     await Database.insertQuery()
          //       .table("sigpq_funcionario_orgaos")
          //       .useTransaction(trx)
          //       .insert(orgao_colocado_secundario);
          //   }
          // }

          // // --- 15. Inserir Curso (sigpq_cursos) - Condicional ---
          // if (input.sigpq_tipo_curso_id && !isNaN(input.sigpq_tipo_curso_id)) {
          //   const curso = {
          //     sigpq_tipo_curso_id: input.sigpq_tipo_curso_id,
          //     pessoafisica_id: pessoaFisicaId,
          //     user_id: input.user_id,
          //     created_at: dateTime,
          //     updated_at: dateTime,
          //   };
          //   await Database.insertQuery()
          //     .table("sigpq_cursos")
          //     .useTransaction(trx)
          //     .insert(curso);
          // }

          // // --- 16. Inserir Carreira (sigpq_carreiras) - Condicional ---
          // if (input.sigpq_tipo_categoria_id) {
          //   const data = {
          //     sigpq_tipo_carreira_id: input.sigpq_tipo_categoria_id,
          //     pessoajuridica_id: input.orgao_id,
          //     pessoafisica_id: pessoaFisicaId,
          //     user_id: input.user_id,
          //     created_at: dateTime,
          //     updated_at: dateTime,
          //   };
          //   await Database.insertQuery()
          //     .table("sigpq_carreiras")
          //     .useTransaction(trx)
          //     .insert(data);
          // }
        }
      }

      await trx.commit();
      console.log(`Sucesso! Inseridos ${NUM_FUNCIONARIOS} funcionários.`);
    } catch (error) {
      await trx.rollback();
      console.error("Erro ao executar o FuncionarioSeeder:", error);
      throw error;
    }
  }
}
