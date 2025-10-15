import Database from '@ioc:Adonis/Lucid/Database';

module.exports = {
  Database
}

import Env from '@ioc:Adonis/Core/Env'
import mongoose from "mongoose";

async function connectToMongoDB() {
  try {
    const client = await mongoose.connect(`mongodb://${Env.get('MONGO_DB_USER')}:${Env.get('MONGO_DB_PASSWORD')}@${Env.get('MONGO_DB_HOST')}:${Env.get('MONGO_DB_PORT')}/${Env.get('MONGO_DB_DATABASE')}`, {});
    console.table("Conectado ao MongoDB");
    return client;
  } catch (err) {
    console.error("Erro ao conectar:", err);
    throw err;
  }
}

export const mongoClient = connectToMongoDB();



