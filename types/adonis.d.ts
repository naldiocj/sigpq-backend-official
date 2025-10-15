declare module '@ioc:Adonis/Lucid/Database' {
    interface ConnectionsList {
      mongodb: {
        client: 'mongodb';
        connectionString: string;
        database: string;
        // Você pode adicionar mais campos aqui conforme necessário
      };
    }
  }
  