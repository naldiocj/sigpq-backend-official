const { filtrarEnv } = require('./config');

const CONEXAO = {
    mysql2: {
        client: 'mysql',
        connection: {
            host: filtrarEnv.MYSQL_HOST,
            port: filtrarEnv.MYSQL_PORT,
            user: filtrarEnv.MYSQL_USER,
            password: filtrarEnv.MYSQL_PASSWORD,
            database: filtrarEnv.MYSQL_DB_NAME
        }
    },
    mongo: {
        // normal: {
        // type: "mongodb",
        // host: "mongo",
        // port: 27017,
        // username: "root",
        // password: "root",
        // database: "fullcycle",
        // authSource: "admin",
        // synchronize: true,
        // logging: false,
        // entities: [CategoryMongoDB],
        // subscribers: [],
        // migrations: [],
    }
}

const mysql2 = require('knex')(CONEXAO.mysql2);
module.exports = {
    mysql2
};
