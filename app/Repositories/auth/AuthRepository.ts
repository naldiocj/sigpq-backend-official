// const Database = use('Database')
// const RoleRepository = use('App/Repositories/RoleRepository')
// const NotFoundException = use("App/Exceptions/NotFoundException");

import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import UserRepository from 'App/Repositories/UserRepository'
import PessoaRepository from 'App/Repositories/PessoaRepository'
import OrgaoRepository from 'App/Repositories/OrgaoRepository'
import RoleRepository from '../RoleRepository'
import UserHelper from 'App/Helper/UserHelper'
import InternalServerException from 'App/Exceptions/InternalServerException'


export default class AuthRepository {
  #userRepo
  #roleRepo
  #pessoaRepo
  #orgaoRepo

  constructor() {
    this.#userRepo = new UserRepository()
    this.#roleRepo = new RoleRepository()
    this.#pessoaRepo = new PessoaRepository()
    this.#orgaoRepo = new OrgaoRepository()
  }

  public async login(email: string, password: string, auth: any) {

    try {
      // Take user
      const userLogin = await this.#userRepo.findBy('email', email)

      if (!userLogin || userLogin.eliminado) {
        return Error('Utilizador não encontrado !')
      }

      if (!userLogin.activo) {
        return Error('Conta desactivada !')
      }

      const salt = new UserHelper();
      // Verify password
      if (!(await Hash.verify(userLogin.password, await salt.getSalt() + password))) {
        return Error('Credenciais inválida !')
      }

      const user = await this.#userRepo.findUser(userLogin.id)

      const role = await this.#userRepo.findRole(userLogin.id)
      const permissions = await this.#roleRepo.findPermissions(role.id)
      const modules = await this.#userRepo.findModules(userLogin.id)

      const pessoa = await this.#pessoaRepo.findById(userLogin.pessoa_id)
      const expirationTime = Env.get('JWT_TOKEN_EXPIR') || '1h'
      const orgao = await this.#orgaoRepo.findOrgaoDaPessoa(userLogin.pessoa_id)
      const orgao_detalhes = await this.#orgaoRepo.findSecaoEEsquadraDaPessoa(userLogin.pessoa_id)

      console.log("Orgão encontrado:",orgao)
      if (!orgao) {
        return Error('Este utilizador não está associado a um orgão')
      }

      const payload = {
        user,
        role,
        permissions,
        modules,
        pessoa,
        orgao,
        orgao_detalhes,
        issuedAt: Date.now()
      }

      const tokenObject = await auth
        .use('jwt').login(userLogin, {
          payload: {
            ...payload,
          },
          expiresIn: expirationTime, // Aumenta o tempo de sessão para 7 dias
        })

      console.log('Está a usar o sistema');
      console.log('Utilizador : ', user?.username);
      console.log('Orgão : ', orgao?.nome_completo);

      return tokenObject
    } catch (e) {
      console.log(e)
      throw new InternalServerException()
    }
  }

  public async logout(auth: any) {

    console.log(auth.user?.username, ' - terminou sessão');

    return
    try {

      // Take user
      // const userLogin = await this.#userRepo.findBy('email', email)

      // if (!userLogin) {
      //   throw new NotFoundException('Utilizador não encontrado !')
      // }

      // Verify if is actived
      // if (userLogin.active) {
      //   throw new NotCreatedException('Conta desactivada !')
      // }

      // const salt = new UserHelper();
      // Verify password
      // if (!(await Hash.verify(userLogin.password, await salt.getSalt() + password))) {
      //   throw new NotCreatedException('Credenciais inválida !')
      // }

      // const user = await this.#userRepo.findUser(userLogin.id)
      // const role = await this.#userRepo.findRole(userLogin.id)
      // const permissions = await this.#roleRepo.findPermissions(role.id)
      // const modules = await this.#userRepo.findModules(userLogin.id)

      // const payload = {
      //   user,
      //   role,
      //   permissions,
      //   modules
      // }

      // const tokenObject = await auth
      //   .use('jwt').login(userLogin, {
      //     payload: {
      //       ...payload,
      //     },
      //   })

      // return tokenObject
    } catch (e) {
      console.log(e)

      throw new InternalServerException('Credênciais inválidas !')
    }
  }

}

