import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import Modulo from 'App/Models/Modulo'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const modulo = await Modulo.findBy('sigla', 'SIGPQ') 

    const user = [
      {
        modulo_id: modulo?.id,
        nome: 'Listar Utilizadores',
        name: 'user-index',
        tabela: 'User',
        operacao: 'Listar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Visualizar Utilizador',
        name: 'user-show',
        tabela: 'User',
        operacao: 'Visualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Eliminar Utilizador',
        name: 'user-delete',
        tabela: 'User',
        operacao: 'Eliminar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Actualizar Utilizador',
        name: 'user-update',
        tabela: 'User',
        operacao: 'Actualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Registar Utilizador',
        name: 'user-store',
        tabela: 'User',
        operacao: 'Registar',
        descricao: 'Criado automaticamente pelo sistema.',
      }
    ]
    await Permission.createMany(user)

    const role = [
      {
        modulo_id: modulo?.id,
        nome: 'Listar Função',
        name: 'role-index',
        tabela: 'Função',
        operacao: 'Listar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Visualizar Função',
        name: 'role-show',
        tabela: 'Função',
        operacao: 'Visualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Eliminar Função',
        name: 'role-delete',
        tabela: 'Função',
        operacao: 'Eliminar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Actualizar Função',
        name: 'role-update',
        tabela: 'Função',
        operacao: 'Actualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Registar Função',
        name: 'role-store',
        tabela: 'Função',
        operacao: 'Registar',
        descricao: 'Criado automaticamente pelo sistema.',
      }
    ]
    await Permission.createMany(role)

    const permission = [
      {
        modulo_id: modulo?.id,
        nome: 'Listar Permissões',
        name: 'permission-index',
        tabela: 'Permissão',
        operacao: 'Listar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Visualizar Permissões',
        name: 'permission-show',
        tabela: 'Permissão',
        operacao: 'Visualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      // {
      //   modulo_id: modulo?.id,
      //   nome:'Eliminar Permissão',
      //   name: 'permission-delete',
      //   descricao: 'Criado automaticamente pelo sistema.',
      // },
      // {
      //  modulo:'SGPQ Tipo de contacto',
      //   nome:'SGPQ Tipo de contacto',
      //   name: 'sgpq-sgpq-tipo-contacto-index',
      //   descricao: 'Criado automaticamente pelo sistema.',
      // },
    ]
    await Permission.createMany(permission) 
 
    const tipoContacto = [
      {
        modulo_id: modulo?.id,
        nome: 'Listar Tipos de Contatos',
        name: 'tipo-contacto-index',
        tabela: 'Tipo de Contacto',
        operacao: 'Listar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Visualizar Tipos de Contatos',
        name: 'tipo-contacto-show',
        tabela: 'Tipo de Contacto',
        operacao: 'Visualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Eliminar Tipos de Contatos',
        name: 'tipo-contacto-delete',
        tabela: 'Tipo de Contacto',
        operacao: 'Eliminar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Actualizar Tipos de Contatos',
        name: 'tipo-contacto-update',
        tabela: 'Tipo de Contacto',
        operacao: 'Actualizar',
        descricao: 'Criado automaticamente pelo sistema.',
      },
      {
        modulo_id: modulo?.id,
        nome: 'Registar Utilizador',
        name: 'tipo-contacto-store',
        tabela: 'Tipo de Contacto',
        operacao: 'Registar',
        descricao: 'Criado automaticamente pelo sistema.',
      }
    ]
    await Permission.createMany(tipoContacto)
  }
}
