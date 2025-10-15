// tests/mongo/mongo_log_service.spec.ts
import { test } from '@japa/runner';
import MongoLogService from 'App/Service/MongoLogService';
import { setDbGetter, getDb } from './../../start/mongo';

test.group('Verificação de conexão MongoDB', () => {
  test('Retorna conexão ativa quando o DB está disponível', async ({ assert }) => {
    const fakeDb = { name: 'db_teste' };
    setDbGetter(async () => fakeDb as any);

    const db = await getDb();
    assert.deepEqual(db, fakeDb);
  });

  test('Retorna null quando o DB está inativo', async ({ assert }) => {
    setDbGetter(async () => null);

    const db = await getDb();
    assert.isNull(db);
  });
});
test.group('Verificar Inserção de dados', (group) => {
  const logData = { message: 'Teste', timestamp: new Date() };

  group.each.teardown(() => {
    // Restaura a versão real após cada teste
    setDbGetter(async () => null);
  });

  test('Salva log quando Mongo está disponível', async ({ assert }) => {
    const insertMock = async (data: any) => {
      insertMock['lastData'] = data;
    };
    const dbMock = {
      collection: () => ({
        insertOne: insertMock,
      }),
    };

    setDbGetter(async () => dbMock as any);

    const service = await MongoLogService.log(logData);
    assert.deepEqual(insertMock['lastData'], logData);
  });

  test('ignora log quando Mongo está indisponível', async ({ assert }) => {
    setDbGetter(async () => null);

    const warnCalls: any[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => warnCalls.push(args.join(' '));

    const service = await MongoLogService.log({ message: 'Teste', timestamp: new Date() });

    assert.isAbove(warnCalls.length, 0);
    assert.match(warnCalls[0], /conexão indisponível/i);

    console.warn = originalWarn;
  });

});
