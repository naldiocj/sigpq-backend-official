const path = require('path');
const dotenv = require('dotenv');

// Define o caminho específico do seu arquivo .env
const envPath = path.join(__dirname, './../../../.env');

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
 
module.exports = {
    filtrarEnv,
    path,
    dotenv
};
