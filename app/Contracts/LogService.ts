export interface LogService {
  log(data: any): Promise<void>;
}
export interface LogServiceOptions {
  collectionName: string;
  db: any; // Replace with the actual type of your database connection
}
export interface LogServiceConstructor {
  new(options: LogServiceOptions): LogService;
}
export class MongoLogService implements LogService {
  private collection: any; // Replace with the actual type of your MongoDB collection
  private db: any; // Replace with the actual type of your database connection
  private collectionName: string;
  constructor(options: LogServiceOptions) {
    this.db = options.db;
    this.collectionName = options.collectionName;
    this.collection = this.db.collection(this.collectionName);
  }
  public async log(data: any): Promise<void> {
    if (!this.db) {
      console.warn('⚠️ MongoDB indisponível, log não salvo.');
      return;
    }
    try {
      await this.collection.insertOne(data);
    } catch (err) {
      console.error("❌ [MongoDB] Erro ao salvar log:", err.message || err);
    }
  }
  public async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      console.log("🔌 [MongoDB] Conexão encerrada.");
      this.db = null;
      this.collection = null;
    }
  }
}
