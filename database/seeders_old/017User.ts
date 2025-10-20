import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pessoa from 'App/Models/Pessoa';
import Pessoafisica from 'App/Models/Pessoafisica';
import User from 'App/Models/User'
import UserRole from 'App/Models/UserRole'

export default class extends BaseSeeder {
  public async run() {

    // Write your database queries inside the run method

    // const role = await Role.findBy('name', 'admin')
  
    await UserRole.create({
      user_id: 1,
      role_id: 1 // root
    });

    // Pedro Kondo
    const pkPessoa = await Pessoa.create({
      nome_completo: 'Pedro Emanuel João Kondo',
      numero_ordem: 20,
      tipo: 'pf'
    })

    const pkUser = await User.create({
      username: 'pedro.kondo',
      email: 'pedro.kondo@pn.gov.ao',
      password: '12345678',
      pessoa_id: pkPessoa.id,
      user_id: 1,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: pkUser.id,
      role_id: 1 // root
    });


   
    // Álvaro Mbeia Daniel Miguel
    const amPessoa = await Pessoa.create({
      nome_completo: 'Álvaro Mbeia Daniel Miguel',
      numero_ordem: 20,
      tipo: 'pf'
    })

    const amUser = await User.create({
      username: 'alvaro.miguel',
      email: 'alvarombeia.danielmiguel@pn.gov.ao',
      password: '12345678',
      pessoa_id: amPessoa.id,
      user_id: 1,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: amUser.id,
      role_id: 1 // root
    });



    await Pessoafisica.create({
      id: pkPessoa.id,
      apelido: 'PK',
      genero: 'M',
      nome_pai: 'Manuel Augusto Kondo',
      nome_mae: 'Adelaide Luíza João',
      data_nascimento: new Date(),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Hélio Vicente
    const hPessoa = await Pessoa.create({
      nome_completo: 'Hélio Vicente',
      numero_ordem: 21,
      tipo: 'pf'
    })

    const hv = await User.create({
      username: 'helio.vicente',
      email: 'helio.vicente@pn.gov.ao',
      password: '12345678',
      pessoa_id: hPessoa.id,
      user_id: pkUser?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: hv.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: hv.id,
      apelido: 'Hélio',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

//domingos djk
    const djkPessoa = await Pessoa.create({
      nome_completo: 'Domingos João Kissimbila',
      numero_ordem: 21,
      tipo: 'pf'
    })

    
    const djk = await User.create({
      username: 'Domingos.jk',
      email: 'Domingos.jk@pn.gov.ao',
      password: '12345678',
      pessoa_id: djkPessoa.id,
      user_id: pkUser?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    

    await UserRole.create({
      user_id: djk.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: djk.id,
      apelido: 'Domingos',
      genero: 'M',
      nome_pai: 'mbeu',
      nome_mae: 'maria',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });





    // Weister Tito 
    const wtPessoa = await Pessoa.create({
      nome_completo: 'Weister Tito ',
      numero_ordem: 22,
      tipo: 'pf'
    })

    const wt = await User.create({
      username: 'weister.tito',
      email: 'weister.tito@pn.gov.ao',
      password: '12345678',
      pessoa_id: wtPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: wt.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: wt.id,
      apelido: 'Weister',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Josefina Manuel 
    const jmPessoa = await Pessoa.create({
      nome_completo: 'Josefina Manuel ',
      numero_ordem: 23,
      tipo: 'pf'
    })

    const jm = await User.create({
      username: 'josefina.manuel',
      email: 'josefina.manuel@pn.gov.ao',
      password: '12345678',
      pessoa_id: jmPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: jm.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: jm.id,
      apelido: 'Joselana',
      genero: 'F',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Luciano Gonçalves 
    const lgPessoa = await Pessoa.create({
      nome_completo: 'Luciano Gonçalves',
      numero_ordem: 24,
      tipo: 'pf'
    })

    const lg = await User.create({
      username: 'luciano.goncalves',
      email: 'luciano.goncalves@pn.gov.ao',
      password: '12345678',
      pessoa_id: lgPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: lg.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: lg.id,
      apelido: 'Luciano',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Belarmino Julho 
    const bjPessoa = await Pessoa.create({
      nome_completo: 'Belarmino Julho',
      numero_ordem: 25,
      tipo: 'pf'
    })

    const bj = await User.create({
      username: 'belarmino.julho',
      email: 'belarmino.julho@pn.gov.ao',
      password: '12345678',
      pessoa_id: bjPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: bj.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: bj.id,
      apelido: 'Belarmino',
      genero: 'F',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Clélia Jorge 
    const cjPessoa = await Pessoa.create({
      nome_completo: 'Clélia Jorge',
      numero_ordem: 26,
      tipo: 'pf'
    })

    const cj = await User.create({
      username: 'clelia.jorge',
      email: 'clelia.jorge@pn.gov.ao',
      password: '12345678',
      pessoa_id: cjPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: cj.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: cj.id,
      apelido: 'Clélia',
      genero: 'F',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Mateus Victor 
    const mvPessoa = await Pessoa.create({
      nome_completo: 'Mateus Victor',
      numero_ordem: 27,
      tipo: 'pf'
    })

    const mv = await User.create({
      username: 'mateus.victor',
      email: 'mateus.victor@pn.gov.ao',
      password: '12345678',
      pessoa_id: mvPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: mv.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: mv.id,
      apelido: 'Mateus',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // José Paulo
    const jpPessoa = await Pessoa.create({
      nome_completo: 'José Paulo',
      numero_ordem: 28,
      tipo: 'pf'
    })

    const jp = await User.create({
      username: 'jose.paulo',
      email: 'jose.paulo@pn.gov.ao',
      password: '12345678',
      pessoa_id: jpPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: jp.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: jp.id,
      apelido: 'José',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });

    // Délcio Zuanga
    const dzPessoa = await Pessoa.create({
      nome_completo: 'Délcio Zuanga',
      numero_ordem: 29,
      tipo: 'pf'
    })

    const dz = await User.create({
      username: 'delcio.zuanga',
      email: 'delcio.zuanga@pn.gov.ao',
      password: '12345678',
      pessoa_id: dzPessoa.id,
      user_id: pkPessoa?.id,
      descricao: 'Criado automaticamente pelo sistema.'
    })

    await UserRole.create({
      user_id: dz.id,
      role_id: 1 // root
    });

    await Pessoafisica.create({
      id: dz.id,
      apelido: 'Délcio',
      genero: 'M',
      nome_pai: 'XXX',
      nome_mae: 'XXX',
      data_nascimento: new Date('2000-01-01'),
      nacionalidade_id: 1,
      estado_civil_id: 1,
      regime_id: 1
    });
  }
}
