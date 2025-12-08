import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class WinstonLoggerProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Registra o Logger no IOC Container para que possa ser injetado (Ex: @inject('WinstonLogger'))
    this.app.container.singleton('WinstonLogger', () => {
      return require('../config/winston').default
    })
  }
}