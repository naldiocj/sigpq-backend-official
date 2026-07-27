import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Database from "@ioc:Adonis/Lucid/Database";

interface PessoaJuridicaData {
  nome_completo: string;
  sigla: string;
  orgao_comando_provincial: string;
  tipo_pessoajuridica_id: number;
}

const data: PessoaJuridicaData[] = [
  {
    nome_completo: "Gabinete Nacional da Interpol",
    sigla: "GNI",
    orgao_comando_provincial: "Órgão",
    tipo_pessoajuridica_id: 1,
  },
]

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
          console.log(`[UPDATE] ${item.sigla} — actualizando orgao_comando_provincial para ${item.orgao_comando_provincial}.`);
          await trx.from("pessoajuridicas")
            .where('sigla', item.sigla)
            .update({
              orgao_comando_provincial: item.orgao_comando_provincial,
              updated_at: now,
            })

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
      "Seed 074: Direcções/Órgãos/Departamentos registados com sucesso."
    );
  }
}
