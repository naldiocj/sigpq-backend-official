import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

export default class RemovePessoasJuridicasDuplicadasSeeder extends BaseSeeder {
  public async run() {
    // Pares (menor_id, maior_id) — remove o menor, mantém o maior
    const pairs: [number, number, string][] = [
      [17, 236, "Direcção de Combate aos Crimes Informáticos"],
      [21, 236, "Direcção de Combate aos Crimes Informáticos"],
      [24, 236, "Direcção de Combate aos Crimes Informáticos"],
      [25, 240, "Direcção de Investigação de Acidentes"],
      [
        26,
        242,
        "Direcção de Educação Patriótica → Educação e Moral e Patriótica",
      ],
      [
        28,
        237,
        "Direcção de Combate aos Crimes de Corrupção → Combate à Corrupção",
      ],
      [30, 234, "Direcção Central de Operações"],
      [33, 241, "Direcção de Atendimento ao Menor em Conflito Com a Lei"],
      [
        35,
        243,
        "Direcção de Combate aos Crimes Contra as Pessoas → Crime Contra as Pessoas",
      ],
      [
        36,
        235,
        "Direcção de Combate aos Crimes Económicos e Contra a Saúde Pública",
      ],
      [43, 46, "Departamento de Gestão Administrativa"],
      [51, 86, "Departamentos Provinciais"],
      [55, 86, "Departamentos Provinciais"],
      [61, 86, "Departamentos Provinciais"],
      [77, 86, "Departamentos Provinciais"],
      [82, 86, "Departamentos Provinciais"],
      [
        149,
        167,
        "Departamento de Insvestigação Criminal Junto do Aeroporto Internacional de Luanda",
      ],
      [150, 168, "Departamento de Segurança InstitucionaL"],
      [
        151,
        169,
        "Departamento de Insvestigação Criminal Junto do Porto de Luanda",
      ],
      [152, 170, "Departamento de Asseguramento e Infra-estruturas"],
      [153, 171, "Departamento de Protocolo e Relações Públicas"],
      [
        161,
        167,
        "Departamento de Insvestigação Criminal Junto do Aeroporto Internacional de Luanda",
      ],
      [162, 168, "Departamento de Segurança InstitucionaL"],
      [
        163,
        169,
        "Departamento de Insvestigação Criminal Junto do Porto de Luanda",
      ],
      [164, 170, "Departamento de Asseguramento e Infra-estruturas"],
      [165, 171, "Departamento de Protocolo e Relações Públicas"],
    ];

    const idsToDelete = pairs
      .map(([id]) => id)
      .filter((v, i, a) => a.indexOf(v) === i);

    if (idsToDelete.length === 0) {
      console.log("Nenhum registo a remover.");
      return;
    }

    console.log(`Removendo ${idsToDelete.length} registos duplicados...`);

    // Desativa FK checks para evitar erros com tabelas addons que referenciam pessoas.id
    await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 0");

    await Database.transaction(async (trx) => {
      for (const [oldId, newId, desc] of pairs) {
        const exists = await trx
          .from("pessoajuridicas")
          .where("id", oldId)
          .first();
        if (!exists) {
          console.log(`[SKIP] ID ${oldId} — já não existe.`);
          continue;
        }

        await trx.from("pessoajuridicas").where("id", oldId).delete();
        await trx.from("pessoas").where("id", oldId).delete();
        console.log(`[REMOVED] ID ${oldId} (mantido ${newId}) — ${desc}`);
      }
    });

    await Database.rawQuery("SET FOREIGN_KEY_CHECKS = 1");

    console.log("Seed 071: Duplicados removidos com sucesso.");
  }
}
