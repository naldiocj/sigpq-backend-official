import Database from "@ioc:Adonis/Lucid/Database";
import NotCreatedException from "App/Exceptions/NotCreatedException";
import NotFoundException from "App/Exceptions/NotFoundException";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import BaseRepository from "./BaseRepository";
import PessoaINPUT from "./Dto/PessoaDto";
import UserINPUT from "./Dto/UserDto";
import PessoaRepository from "./PessoaRepository";
// import RoleRepository from './RoleRepository'

export default class UserRepository extends BaseRepository {
  #repoPessoa: any;
  // #repoRole: any

  constructor() {
    super(User);
    this.#repoPessoa = new PessoaRepository();
    // this.#repoRole = new RoleRepository()
  }

  /**
   * Returns a list of elements
   * @param { number } page
   *
   * @returns { object[] } findAll
   */
  public async findAll(
    options: any = {
      page: null,
      perPage: null,
      search: null,
      searchBy: null,
      orderBy: null,
      orderByAscOrDesc: null,
    }
  ) {
    try {
      let query = User.query()
        .where("username", "<>", "Root")
        .where("eliminado", false)
        .where(function () {
          if (options.search) {
            if (options.searchBy instanceof Array) {
              options.searchBy.forEach((key: any) => {
                query.orWhere(key, "like", `%${options.search}%`);
              });
            } else {
              query.orWhere(options.searchBy, "like", `%${options.search}%`);
            }
          }
          if (options.orderBy) {
            if (options.orderBy instanceof Array) {
              options.orderBy.forEach((key: any) => {
                query.orderBy(key, options.orderByAscOrDesc);
              });
            } else {
              query.orderBy(options.orderBy, options.orderByAscOrDesc);
            }
          }
        })
        .clone();

      return options.page
        ? await query.paginate(options.page, options.perPage || 10)
        : await query;
    } catch (e) {
      console.log(e);
      throw new NotFoundException("Não foi possível listar!");
    }
  }

  public async store(input: any): Promise<any> {
    const error: any = [];

    let varPessoa: any;
    let varUser: any;

    const trx = await Database.transaction();

    try {
      const userEmailExist = await this.findBy("email", input.email);

      if (userEmailExist) {
        error.push({ name: "Email já existe ! " });
      }

      const userNameExist = await this.findBy("username", input.username);

      if (userNameExist) {
        error.push({ name: "Nome de utilizador já existe ! " });
      }

      if (error.length) {
        throw new NotCreatedException();
      }

      const pessoaINPUT: PessoaINPUT = {
        nome_completo: input.nome_completo,
        tipo: input.tipo,
        activo: input.activo,
        user_id: input.user_id,
      };

      // create pessoa
      varPessoa = await this.#repoPessoa.store(pessoaINPUT, trx);

      const userINPUT: UserINPUT = {
        username: input.username,
        email: input.email,
        password: await Hash.make(input.password),
        activo: input.activo,
        notificar_por_email: false,
        pessoa_id: varPessoa?.item?.id,
        user_id: input.user_id,
        aceder_departamento: input.aceder_departamento,
        aceder_seccao: input.aceder_seccao,
        aceder_posto_policial: input.aceder_posto_policial,
      };

      // create user
      // varUser = await User.create(userINPUT);
      varUser = await new User().fill(userINPUT).useTransaction(trx).save();

      // add role in user
      await this.storeUserRole(varUser.id, input.role_id, trx);

      // await trx.rollback()
      await trx.commit();

      return {
        pessoa: varPessoa.item,
        user: varUser,
        // role: role
      };
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw new NotCreatedException(null, error);
    }
  }

  public async findBy(input, value) {
    try {
      const user = await Database.query()
        .select("users.*")
        .from("users")
        .innerJoin(
          "sigpq_funcionario_orgaos as sfo",
          "sfo.pessoafisica_id",
          "users.pessoa_id"
        )
        .where(input, value)
        .where("sfo.nivel_colocacao", "muito-alto")
        .where("users.eliminado", false)
        .where("sfo.eliminado", false)
        .first();

      return user;
    } catch (e) {
      console.log(e);
      throw new NotFoundException(null, []);
    }
  }

  public async findUser(user_id: any) {
    try {
      const user = await Database.query()
        .from({ u: "users" })
        .select(
          "u.id",
          "pessoas.id as pessoas_id",
          "pessoas.nome_completo",
          "u.user_id",
          "u.username",
          "u.email",
          "u.activo",
          "u.forcar_alterar_senha",
          "u.aceder_painel_piips",
          "u.aceder_departamento",
          "u.aceder_seccao	",
          "u.aceder_posto_policial",
          "u.aceder_todos_agentes",
          "pf.naturalidade_id",
          Database.raw(
            "DATE_FORMAT(u.created_at, '%d/%m/%Y %H:%i:%s') as created_at"
          ),
          Database.raw(
            "DATE_FORMAT(u.updated_at, '%d/%m/%Y %H:%i:%s') as updated_at"
          )
        )
        .innerJoin("pessoas", "pessoas.id", "u.pessoa_id")
        .leftJoin("pessoafisicas as pf", "pf.id", "pessoas.id")
        .where("u.id", user_id)
        .first();

      return user;
    } catch (e) {
      console.log(e);
      throw new NotCreatedException(null, []);
    }
  }

  public async findRole(user_id: any) {
    try {
      const userRole = await Database.from({ ur: "user_roles" })
        .select(
          "r.id",
          "r.nome",
          "r.name",
          Database.raw(
            "DATE_FORMAT(r.created_at, '%d/%m/%Y %H:%i:%s') as created_at"
          ),
          Database.raw(
            "DATE_FORMAT(r.updated_at, '%d/%m/%Y %H:%i:%s') as updated_at"
          )
        )
        .innerJoin("roles as r", "r.id", "ur.role_id")
        .where("ur.user_id", user_id)
        .first();

      return userRole;
    } catch (e) {
      console.log(e);
      throw new NotCreatedException(null, []);
    }
  }

  public async findModules(user_id: any) {
    try {
      const module = await Database.from({ ur: "user_roles" })
        .select(
          "m.id",
          "m.nome",
          "m.sigla",
          "r.id as role_id",
          "r.nome as role_nome"
        )
        .innerJoin("roles as r", "r.id", "ur.role_id")
        .innerJoin("modulos as m", "m.id", "r.modulo_id")
        .where("ur.user_id", user_id)
        .first();

      return module;
    } catch (e) {
      console.log(e);
      throw new NotCreatedException(null, []);
    }
  }

  public async storeUserRole(user_id: any, role_id: any, trx: any) {
    console.log(
      "user",
      user_id,
      "role",
      role_id,
      " -> faltou melhorar o registo de role do user"
    );
    const input = {
      user_id,
      role_id,
    };

    return await trx.insertQuery().table("user_roles").insert(input);
  }

  public async findUserWithoutAccount(
    options: any = {
      page: null,
      perPage: null,
      search: null,
      searchBy: null,
      orderBy: null,
      orderByAscOrDesc: null,
    }
  ) {
    try {
      let query = User.query()
        .join("pessoas p", "p.id", "users.pessoa_id")
        .where("username", "<>", "Root")
        .where("eliminado", false)
        .where("p.id", "<>", "users.pessoa_id")
        .where(function () {
          if (options.search) {
            if (options.searchBy instanceof Array) {
              options.searchBy.forEach((key: any) => {
                query.orWhere(key, "like", `%${options.search}%`);
              });
            } else {
              query.orWhere(options.searchBy, "like", `%${options.search}%`);
            }
          }
          if (options.orderBy) {
            if (options.orderBy instanceof Array) {
              options.orderBy.forEach((key: any) => {
                query.orderBy(key, options.orderByAscOrDesc);
              });
            } else {
              query.orderBy(options.orderBy, options.orderByAscOrDesc);
            }
          }
        })
        .clone();

      return options.page
        ? await query.paginate(options.page, options.perPage || 10)
        : await query;
    } catch (e) {
      console.log(e);
      throw new NotFoundException("Não foi possível listar!");
    }
  }
}
