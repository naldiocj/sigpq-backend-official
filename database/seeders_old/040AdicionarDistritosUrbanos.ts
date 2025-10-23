import Database from "@ioc:Adonis/Lucid/Database";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

const dataNew = [
  {
    nome: "Cabolombo",
    sigla: "CAB",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Cabolombo, Município de Belas, Luanda",
    municipio_id: 94,
  },
  {
    nome: "Barra do Cuanza",
    sigla: "BAR",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Barra do Cuanza, Município de Belas, Luanda",
    municipio_id: 94,
  },
  {
    nome: "Ramiros",
    sigla: "RAM",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Ramiros, Município de Belas, Luanda",
    municipio_id: 94,
  },
  {
    nome: "Benfica",
    sigla: "BEN",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Benfica, Município de Belas, Luanda",
    municipio_id: 94,
  },

  {
    nome: "Quicolo",
    sigla: "QUI",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Quicolo, Município de Cacuaco, Luanda",
    municipio_id: 95,
  },
  {
    nome: "Funda",
    sigla: "FUN",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Funda, Município de Cacuaco, Luanda",
    municipio_id: 95,
  },

  {
    nome: "Hoji ya Henda",
    sigla: "HOJ",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Hoji ya Henda, Município de Cazenga, Luanda",
    municipio_id: 97,
  },
  {
    nome: "11 de Novembro",
    sigla: "11N",
    user_id: 1,
    activo: 1,
    descricao:
      "Distrito Urbano de 11 de Novembro, Município de Cazenga, Luanda",
    municipio_id: 97,
  },
  {
    nome: "Kima Kieza",
    sigla: "KIK",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Kima Kieza, Município de Cazenga, Luanda",
    municipio_id: 97,
  },
  {
    nome: "Tala Hadi",
    sigla: "TAL",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Tala Hadi, Município de Cazenga, Luanda",
    municipio_id: 97,
  },

  {
    nome: "Golfe",
    sigla: "GOL",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Golfe, Município de Kilamba Kiaxi, Luanda",
    municipio_id: 101,
  },
  {
    nome: "Sapú",
    sigla: "SAP",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Sapú, Município de Kilamba Kiaxi, Luanda",
    municipio_id: 101,
  },
  {
    nome: "Palanca",
    sigla: "PAL",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Palanca, Município de Kilamba Kiaxi, Luanda",
    municipio_id: 101,
  },
  {
    nome: "Nova Vida",
    sigla: "NOV",
    user_id: 1,
    activo: 1,
    descricao:
      "Distrito Urbano de Nova Vida, Município de Kilamba Kiaxi, Luanda",
    municipio_id: 101,
  },

  {
    nome: "Estalagem",
    sigla: "EST",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Estalagem, Município de Viana, Luanda",
    municipio_id: 109,
  },
  {
    nome: "Kikuxi",
    sigla: "KIK",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Kikuxi, Município de Viana, Luanda",
    municipio_id: 109,
  },
  {
    nome: "Baía",
    sigla: "BAÍ",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Baía, Município de Viana, Luanda",
    municipio_id: 109,
  },
  {
    nome: "Zango",
    sigla: "ZAN",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Zango, Município de Viana, Luanda",
    municipio_id: 109,
  },
  {
    nome: "Vila Flôr",
    sigla: "VIF",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Vila Flôr, Município de Viana, Luanda",
    municipio_id: 109,
  },

  {
    nome: "Camama",
    sigla: "CAM",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Camama, Município de Talatona, Luanda",
    municipio_id: 108,
  },
  {
    nome: "Futungo de Belas",
    sigla: "FUT",
    user_id: 1,
    activo: 1,
    descricao:
      "Distrito Urbano de Futungo de Belas, Município de Talatona, Luanda",
    municipio_id: 108,
  },
  {
    nome: "Lar do Patriota",
    sigla: "LAR",
    user_id: 1,
    activo: 1,
    descricao:
      "Distrito Urbano de Lar do Patriota, Município de Talatona, Luanda",
    municipio_id: 108,
  },
  {
    nome: "Quificas",
    sigla: "QUI",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Quificas, Município de Talatona, Luanda",
    municipio_id: 108,
  },

  {
    nome: "Ngola Kiluanje",
    sigla: "NGO",
    user_id: 1,
    activo: 1,
    descricao:
      "Distrito Urbano de Ngola Kiluanje, Município de Sambizanga, Luanda",
    municipio_id: 107,
  },

  {
    nome: "Maculusso",
    sigla: "MAC",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Maculusso, Município de Ingombota, Luanda",
    municipio_id: 99,
  },

  {
    nome: "Rocha Pinto",
    sigla: "ROC",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Rocha Pinto, Município de Maianga, Luanda",
    municipio_id: 102,
  },

  {
    nome: "Neves Bendinha",
    sigla: "NEV",
    user_id: 1,
    activo: 1,
    descricao: "Distrito Urbano de Neves Bendinha, Município de Rangel, Luanda",
    municipio_id: 105,
  },
];

function getDistritosUrbanos(iterator: any) {
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
        await trx.table("distritos").insert(getDistritosUrbanos(iterator));
      }
    });

    console.log("Distritos Urbanos registadas com sucesso.");
  }
}
