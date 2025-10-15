
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database';

export default class UserHelper {

    #salt: any

    constructor() {
        this.#salt = process.env.SALT;
    }

    public async generatePasswordWithSalt(password: any) {
        return await Hash.make(this.#salt + password)
    }

    public async generatePasswordWithSaltDefault() {
        return await Hash.make(this.#salt + '12345678')
    }

    public async getSalt(){
        return await this.#salt;
    }

    public async checkPassword(firstPassword:string, secondPassword:string): Promise<boolean> { 
        return !(await Hash.verify(firstPassword, await this.getSalt() + secondPassword))
    }
    
    public async getCode(): Promise<any> {
        const code: string = `${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}`;

        const user = await Database.from({ u: 'users' }).select('u.*').where('u.code_reset', code).first()

        if (user) {
            await this.getCode()
        }
        return code;

    }
}