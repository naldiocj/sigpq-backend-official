// app/Services/MongoLogger.ts
//import { MongoClient, Db, Collection } from 'mongodb'

//import { getDb } from "start/mongo"
import { getDb } from "./../../start/mongo"

class MongoLogService {
  private collectionName = 'access_logs'

  public async log(data: any): Promise<void> {

    const db = await getDb()
    if (!db) {
      console.warn('⚠️ MongoDB indisponível, log não salvo.')
      return
    }

    try {
      await db.collection(this.collectionName).insertOne(data)
    } catch (err) {
      console.error("❌ [MongoDB] Erro ao salvar log:", err.message || err);
    }
  }
}

export default new MongoLogService()
