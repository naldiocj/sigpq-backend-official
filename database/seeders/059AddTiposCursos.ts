import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

const cursos = [
  'RELAÇÕES INTERNACIONAIS',
  'LITERATURA E LÍNGUA INGLESA',
  'ENGENHARIA INFORMÁTICA',
  'GESTÃO E DESENVOLVIMENTO',
  'LÍNGUA E LITERATURA INGLESA',
  'DIREITO',
  'LÍNGUA INGLESA',
  'CIÊNCIAS ECONÓMICAS E JURÍDICAS',
  'CCOMBATE AO TRÁFICO INTERNACIONAL DE DROGAS',
  'PSICOLOGIA DAS ORGANIZAÇÕES',
  'FINANÇAS',
  'TELECOMUNICAÇÕES',
  'LINGUA PORTUGUESA',
  'ECONOMIA',
]

export default class AddTiposCursosSeeder extends BaseSeeder {
  public async run() {
    const now = new Date()

    for (const nome of cursos) {
      const existing = await Database
        .from('sigpq_tipo_cursos')
        .where('nome', nome)
        .first()

      if (!existing) {
        // build sigla from initials of words in the name
        const words = nome.match(/\p{L}+/gu) || []
        // use only words with 2 or more letters
        const parts = words.filter(w => w.length >= 2)
        let sigla = parts.map(w => w[0].toUpperCase()).join('')
        // ensure sigla has at least 2 letters: fallback to first word's first two letters
        if (sigla.length < 2 && words.length > 0) {
          const w = words[0]
          sigla = (w!.slice(0, 2) || w![0]).toUpperCase()
        }

        await Database
          .table('sigpq_tipo_cursos')
          .insert({
            nome,
            sigla,
            activo: 1,
            user_id: 1,
            eliminado: 0,
            created_at: now,
            updated_at: now,
          })
      }
    }
  }
}
