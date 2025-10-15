// start/mongo.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGO_DB || "adonis_db";

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Conectar ao MongoDB e retornar a instância do banco de dados
 * @returns {Promise<Db>} Instância do banco de dados
 */
export async function realGetDb(): Promise<Db | null> {
  if (db) return db; // Retorna se já estiver conectado

  try {
    client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });

    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("❌ [MongoDB] Falha na conexão:", error.message || error);
    return null;
  }
}
/**
 * Fecha a conexão com o MongoDB
 */
export async function closeMongoConnection() {
  if (client) {
    await client.close();
    console.log("🔌 [MongoDB] Conexão encerrada.");
    client = null;
    db = null;
  }
}

/**
 * Função para test Db do MongoDB
 * @returns {Promise<Db | null>} Instância do banco de dados
 */

// EXPORTÁVEL E MOCKÁVEL
export let getDb: () => Promise<Db | null> = realGetDb;

export function setDbGetter(fn: () => Promise<Db | null>) {
  getDb = fn;
}