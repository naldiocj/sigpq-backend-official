import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TipoFamiliaSeeder extends BaseSeeder {
  public async run () {
    const now = new Date()
    
    const existing = await Database
      .from('sigpq_tipo_familiars')
      .where('nome', 'Filho (a)')
      .first()

    if (!existing) {
      await Database
        .table('sigpq_tipo_familiars')
        .insert({
          nome: 'Filho (a)',
          descricao: 'Criado automaticamente pelo sistema.',
          estado: 1,
          user_id: 2, 
          eliminado: 0,      
          created_at: now, 
          updated_at: now,
        })
    }
  }
}