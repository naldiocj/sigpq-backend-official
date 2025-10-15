// config/mongodb.ts

import Env from "@ioc:Adonis/Core/Env";

const mongodbConfig = {
  client: "mongodb",
  connectionString: Env.get("MONGODB_URI") as string,
  database: Env.get("MONGO_DB_NAME", "piips") as string,
};

export default mongodbConfig;
