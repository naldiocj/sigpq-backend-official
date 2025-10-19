import Env from "@ioc:Adonis/Core/Env";
import { redisConfig } from "@adonisjs/redis/build/config";

export default redisConfig({
  connection: Env.get("REDIS_CONNECTION", "local"),
  connections: {
    local: {
      host: Env.get("REDIS_HOST", "127.0.0.1"),
      port: Env.get("REDIS_PORT", "6379"),
      password: Env.get("REDIS_PASSWORD", ""),
      db: 0,
      keyPrefix: "",
      // Pool configuration options
      connectionName: "redis",
      pool: {
        max: 20000, // Aumentado para suportar mais conexões simultâneas
        min: 500, // Mantém um pool maior de conexões prontas
        maxRetriesPerRequest: 15, // Aumentado para mais tentativas em caso de falha
        // autocommit: false,
        // evictionRunIntervalMillis: 1000,
        // softIdleTimeoutMillis: 1000,
        // numTestsPerEvictionRun: 3,
        // testOnBorrow: true,
        // testWhileIdle: true,
        // FIFO: false
      },
      healthCheck: true,
    },
  },
});
