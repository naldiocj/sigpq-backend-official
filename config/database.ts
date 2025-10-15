/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import { resolve, sep } from 'path'
import { loadDirectories } from '../app/@piips/shared/metodo-generico/loaders'

import mongodbConfig from './mongodb'

let migrations = loadDirectories(resolve(__dirname, '../addons'))
  // .filter((path) => path.includes('db' + sep))
  .filter((path) => path.includes('migrations'))
  .map((k) => {
    return `.${sep}addons${sep}${k.split(`addons${sep}`)[1]}`
  })


migrations.push('./database/migrations')
// console.log(migrations);
// migrations = []

// const seeders = loadDirectories(resolve(__dirname, '../@unig4construction'))
//   .filter((path) => path.includes('db/'))
//   .filter((path) => path.includes('seeders'))
//   .map((k) => {
//     return `../@unig4construction/${k.split('@unig4construction/')[1]}`
//   })
// seeders.push('database/seeders')

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
      },
      pool: {
        min: 500,
        max: 20000,
        idleTimeoutMillis: 120000,
        createTimeoutMillis: 15000,
        acquireTimeoutMillis: 45000,
        propagateCreateError: false,
      },
      // migrations: {
      //   naturalSort: true,
      // },
      migrations: {
        naturalSort: true,
        // paths: ['database/migrations'],
        // paths: [...migrations, './database/migrations'],
        // paths: [...migrations],
        // disableRollbacksInProduction: true,
      },
      // seeders: {
      //   paths: [...seeders],
      // },
      healthCheck: false,
      debug: true,
    },
    mongodb: mongodbConfig

  }
}

export default databaseConfig
