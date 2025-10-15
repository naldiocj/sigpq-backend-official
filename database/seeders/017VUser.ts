import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pessoa from 'App/Models/Pessoa';
import Pessoafisica from 'App/Models/Pessoafisica';
import Role from 'App/Models/Role';
import User from 'App/Models/User'
import UserRole from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run() {

    // Write your database queries inside the run method

    const operador = await Role.findBy('name', 'operador')
  
    //Isilda Francisco
    const p1 = await Pessoa.create({
      nome_completo: 'Isilda Francisco',
      numero_ordem: 101,
      tipo: 'pf'
    })

    await User.create({
      username: 'isilda.francisco',
      email: 'isilda.francisco@pn.gov.ao',
      password: '12345678',
      pessoa_id: p1.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p1.id,
      apelido: 'XXX',
      genero: 'F',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p1.id,
      role_id: operador?.id
    });

    // Domingas Afonso
    const p2 = await Pessoa.create({
      nome_completo: 'Domingas Afonso',
      numero_ordem: 102,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'domingas.afonso',
      email: 'domingas.afonso@pn.gov.ao',
      password: '12345678',
      pessoa_id: p2.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await User.create({
      username: 'Domingos.ck',
      email: 'Domingos.jk@pn.gov.ao',
      password: '12345678',
      pessoa_id: p2.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p2.id,
      apelido: 'XXX',
      genero: 'F',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p2.id,
      role_id: operador?.id
    });

    // Fatima Fastudo
    const p3 = await Pessoa.create({
      nome_completo: 'Fatima Fastudo',
      numero_ordem: 103,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'fatima.fastudo',
      email: 'fatima.fastudo@pn.gov.ao',
      password: '12345678',
      pessoa_id: p3.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p3.id,
      apelido: 'XXX',
      genero: 'F',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p3.id,
      role_id: operador?.id
    });

    // Amilton Ngolome
    const p4 = await Pessoa.create({
      nome_completo: 'Amilton Ngolome',
      numero_ordem: 104,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'amilton.ngolome',
      email: 'amilton.ngolome@pn.gov.ao',
      password: '12345678',
      pessoa_id: p4.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p4.id,
      apelido: 'XXX',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p4.id,
      role_id: operador?.id
    });

    // Pedro António
    const p5 = await Pessoa.create({
      nome_completo: 'Pedro António',
      numero_ordem: 105,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'pedro.antonio',
      email: 'pedro.antonio@pn.gov.ao',
      password: '12345678',
      pessoa_id: p5.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p5.id,
      apelido: 'XXX',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p5.id,
      role_id: operador?.id
    });

    // José de Lima
    const p6 = await Pessoa.create({
      nome_completo: 'José de Lima',
      numero_ordem: 106,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'jose.Lima',
      email: 'jose.lima@pn.gov.ao',
      password: '12345678',
      pessoa_id: p6.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p6.id,
      apelido: 'XXX',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p6.id,
      role_id: operador?.id
    });

    // William Pascoal
    const p7 = await Pessoa.create({
      nome_completo: 'William Pascoal',
      numero_ordem: 107,
      tipo: 'pf'
    })
    
    await User.create({
      username: 'william.pascoal',
      email: 'william.pascoal@pn.gov.ao',
      password: '12345678',
      pessoa_id: p7.id,
      user_id: 2,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await Pessoafisica.create({
      id: p7.id,
      apelido: 'XXX',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    await UserRole.create({
      user_id: p7.id,
      role_id: operador?.id
    });
  }
}
