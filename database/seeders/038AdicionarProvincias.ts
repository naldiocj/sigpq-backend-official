import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

const dataNew = [
  {
    nome: "Moxico Leste",
    sigla: "MOXL",
    user_id: 2,
    activo: 1,
    pais_id: 1,
    descricao:
      "A província do Moxico Leste está localizada no leste de Angola.",
  },
  {
    nome: "Icolo e Bengo",
    sigla: "ICOBEN",
    user_id: 2,
    activo: 1,
    pais_id: 1,
    descricao:
      "A província do Icolo e Bengo está localizada no noroeste de Angola.",
  },
  {
    nome: "Cuando",
    sigla: "CUAN",
    user_id: 2,
    activo: 1,
    pais_id: 1,
    descricao: "A província do Quando está localizada no sudeste de Angola.",
  },
];

function getProvincia(iterator: any) {
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
        await trx.table("provincias").insert(getProvincia(iterator));
      }
    });

    console.log("Novas Provincias registadas com sucesso.");
  }
}
