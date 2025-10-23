import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

const dataNew = [
  {
    nome: "Doença",
    sigla: "DO",
    user_id: 1,
    activo: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome: "Discliplinar",
    sigla: "DI",
    user_id: 1,
    activo: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome: "Criminal",
    sigla: "CR",
    user_id: 1,
    activo: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome: "Bolseiro",
    sigla: "BO",
    user_id: 1,
    activo: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome: "Destacamento",
    sigla: "DE",
    user_id: 1,
    activo: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
  {
    nome: "A disposição",
    sigla: "AD",
    user_id: 1,
    activo: 1,
    descricao: "Criado automaticamente pelo sistema.",
  },
];

function getSituacao(iterator: any) {
  return {
    ...iterator,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

export default class extends BaseSeeder {
  public async run() {
    await Database.transaction(async (trx) => {
      for (const iterator of dataNew) {
        await trx.table("sigpq_situacao_estados").insert(getSituacao(iterator));
      }
    });

    console.log("Nova Situação adicionada com sucesso.");
  }
}
