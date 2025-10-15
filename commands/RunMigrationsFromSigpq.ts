import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class RunMigrationsFromSigpq extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'run:migrations_from_sigpq'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Run migrations from a sigpq'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Hello world! I´m run migrations')
    // const folderPath = 'addons/modulo-sigpq/migrations' // Caminho da pasta das migrações

    // const migrateRunCommand = new MigrateRun(this.application, this.logger)

    console.log(this.application, this.logger);

    try {

      // await migrateRunCommand.run({ folder: folderPath })
      this.logger.success('Migrations executed successfully')
    } catch (error) {
      this.logger.error('Error running migrations:', error)
    }
  }
}
