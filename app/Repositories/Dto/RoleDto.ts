import Role from "App/Models/Role";

export default class RoleDto {
  #input
  constructor(ctx: Role) {
    this.#input = ctx;
  }

  /**
   name
   */
  executar() {
    return this.#input
    // return equals(['name','descricao', 'user_id']),(this.#input).toString() 

    // modulo_id : string
    // nome : string
    // name : string 
    // activo? : boolean
    // descricao : string
  }
}
