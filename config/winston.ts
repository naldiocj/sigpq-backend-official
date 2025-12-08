import winston from 'winston'
import MySQLTransport from 'winston-mysql' // Certifique-se de que o pacote 'winston-mysql' está instalado
import Env from '@ioc:Adonis/Core/Env'

// Configuração do Transport para MySQL
const mysqlTransport = new MySQLTransport({
  host: Env.get('MYSQL_HOST'), // Pega o HOST do seu MySQL no .env
  user: Env.get('MYSQL_USER'),
  password: Env.get('MYSQL_PASSWORD'),
  database: Env.get('MYSQL_DB_NAME'),
  table: 'logs', // Nome da tabela que criamos na migração
  // Opcional: converte a mensagem e os metadados para JSON no campo 'message'
  // fields: { level: 'level', meta: 'meta', message: 'message' }
})

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }), // Inclui stack trace para erros
  winston.format.splat(),
  winston.format.json() // Usa formato JSON para logs estruturados
)

// Define os transports (destinos)
const transports: winston.transport[] = [
  // 1. Console (para ambiente de desenvolvimento)
  new winston.transports.Console({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(
        ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
      )
    ),
  }),

  // 2. Arquivo (para logs em disco)
  new winston.transports.File({
    filename: 'logs/app.log',
    level: 'warn',
  }),

  // 3. MySQL Database (para persistência e reporte)
  // Use 'error' ou 'warn' aqui para não sobrecarregar o DB com logs de 'info'
  new winston.transports.File({
    filename: 'logs/error.log', // Salva logs de erro em arquivo separado
    level: 'error',
  }),
]

// Adiciona o MySQL Transport APENAS se não estiver em ambiente de teste
if (Env.get('NODE_ENV') !== 'test') {
    transports.push(mysqlTransport as any) // Adiciona o transport do MySQL
}


const Logger = winston.createLogger({
  level: Env.get('LOG_LEVEL', 'info'),
  transports: transports,
  format: format,
  exitOnError: false,
})

export default Logger