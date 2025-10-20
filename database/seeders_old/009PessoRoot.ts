import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pessoa from 'App/Models/Pessoa';
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {

    // Root
    await Pessoa.create({
      nome_completo: 'Root',
      numero_ordem: 1,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'Root',
      email: 'root@pn.gov.ao',
      password: 'Root@2022',
      pessoa_id: 1,
      descricao: 'Criado automaticamente pelo sistema.'
    })

  }
    
}
