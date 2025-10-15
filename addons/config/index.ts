const { path, dotenv } = require('./database/config')
const knex = require('knex');

// Define o caminho específico do seu arquivo .env
const envPath = path.join(__dirname, './../../.env');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: envPath });

const {
    XSOURCEFONT,
    NODE_ENV,
    PORT,
    HOST,
    APP_KEY,
    DRIVE_DISK,
    DB_CONNECTION,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB_NAME,
    JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY,
    SALT
} = process.env;

// interface Environment {
//     [key: string]: string | undefined;
// }

const filtrarEnv = {
    XSOURCEFONT,
    NODE_ENV,
    PORT,
    HOST,
    APP_KEY,
    DRIVE_DISK,
    DB_CONNECTION,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DB_NAME,
    JWT_PRIVATE_KEY,
    JWT_PUBLIC_KEY,
    SALT
};

// interface ConnectionOptions {
//     client: string;
//     connection: {
//         host: string;
//         port: string;
//         user: string;
//         password: string;
//         database: string;
//     }
// }

const CONEXAO = {
    mysql2: {
        client: 'mysql2',
        connection: {
            host: filtrarEnv.MYSQL_HOST,
            port: filtrarEnv.MYSQL_PORT,
            user: filtrarEnv.MYSQL_USER,
            password: filtrarEnv.MYSQL_PASSWORD,
            database: filtrarEnv.MYSQL_DB_NAME
        }
    },
    // ... Omitido para brevidade ...
}


// o que é necessário
const db = knex(CONEXAO.mysql2);

async function listarUm(id) {
    return db.from('users').where('id', id).first();
}

async function listarTodos() {
    return db.from('users').select('*');
}

async function registar(userData) {
    return db('users').insert(userData);
}

async function actualizar(id, updatedData) {
    return db('users').where('id', id).update(updatedData);
}

async function eliminar(id) {
    return db('users').where('id', id).del();
}

async function main() {
    try {
        console.log(await listarUm(2));
        // console.log(await listarTodos());
    } catch (error) {
        console.error(error);
    }
    db.destroy();
}

main();
