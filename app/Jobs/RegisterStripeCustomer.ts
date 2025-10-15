import type { JobHandlerContract, Job } from '@ioc:Rlanz/Queue'
import RedisService from 'App/@piips/shared/service/redis/RedisService';

export type RegisterStripeCustomerPayload = {}

export default class implements JobHandlerContract {
  private redis =new RedisService();
	constructor(public job: Job) {
    this.job = job
  }

  /**
   * Base Entry point
   */
  public async handle(payload: RegisterStripeCustomerPayload) {
    if(await this.redis.existsKey('piips'))
    {
       console.log("Dados ja está inserido");
    }else{
      await this.redis.storeValue('piips','AMBIENTE DE TRABALHO');
    }
  }

  /**
   * This is an optional method that gets called if it exists when the retries has exceeded and is marked failed.
   */
  public async failed() {
    console.log("Não foi cadastrado nada e deu errado");
  }
}
