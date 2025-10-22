import Redis from '@ioc:Adonis/Addons/Redis'
import generateCacheKey from '../../metodo-generico/Gerar-Hash-Com-Base-Numa-String'
Redis.connection().setMaxListeners(5000)
export default class RedisService {

  async retrieveHashField(key, field) {
    return await Redis.hget(key, field)
  }

  async storeHashField(key, field, value) {
    return await Redis.hset(key, field, value)
  }

  async deleteHashField(key, field) {
    return await Redis.hdel(key, field)
  }

  async deleteUnlink(key: string) {
    return await Redis.unlink(key)
  }

  async incrementAcesstoKey(key_acess: string, keyStorage: string) {
    //await Redis.zincrby(`Search:Nome:${orgaoId}:access_count`, 1, `search:Nome:${orgaoId}:hash:${hash}`);
    return await Redis.zincrby(key_acess, 1, keyStorage);
  }

  ////await this.redis.getMoreAcessKeys('funcionario',orgao.id,3)
  async getMoreAcessKeys(nome: string, key: string, limit_quantidade: number = 4) {
    // await Redis.zrevrange(`Search:Nome:${orgaoId}:access_count`, 0, 4, 'WITHSCORES');
    return await Redis.zrevrange(`search:${nome}:orgao:${key}:access_count`, 0, limit_quantidade - 1, 'WITHSCORES');
  }

  async setExpiration(key, ttl) {
    return await Redis.expire(key, ttl)
  }

  async getTTL(key) {
    return await Redis.ttl(key)
  }

  async existsKeyHash(key, field) {
    return await Redis.hexists(key, field)
  }

  async getKeys(pattern) {
    return await Redis.keys(pattern)
  }

  async deleteAllData() {
    console.log("Eliminando todos dados do redis")
    return Redis.flushdb()
  }

  async verificarSeExisteEArmazenaNoRedisNoFinalRetornaResultado(name: string, key: string, options: any, repository: any, comparar_name_dashboard: string = '') {
    const options_aux = await this.limparFiltroCaptarSomenteQuemTiverValor(options)
    const hash = await generateCacheKey((name == comparar_name_dashboard) ? options.orgao : options_aux);
    const keyStorage = `search:${name}:orgao:${key}:hash:${hash}`;
    if (!await this.retrieveHashField(keyStorage, 'results')) {
      await this.armazenarDadosNoRedis(keyStorage, options, repository);
    }
    const result = await this.obterResultadoDoRedis(keyStorage);
    await this.incrementAcesstoKey(`search:${name}:orgao:${key}:access_count`, keyStorage); //aumenta as vezes de acesso
    await this.setExpiration(keyStorage, 604800); // renova o tempo de expiração
    return result;
  }

  async armazenarDadosNoRedis(keyStorage: string, options: any, repository: any) {
    const options_aux = await this.limparFiltroCaptarSomenteQuemTiverValor(options)
    let dados;
    // await Promise.all([
    dados = await repository.listarTodos(options_aux)
    this.storeHashField(keyStorage, 'results', JSON.stringify(dados))
    this.storeHashField(keyStorage, 'filters', JSON.stringify(options_aux))
    this.setExpiration(keyStorage, 604800) // expira em 1 semana
    // ]);
  }

  async obterResultadoDoRedis(keyStorage: string) {
    const result = JSON.parse(await this.retrieveHashField(keyStorage, 'results') ?? '');
    if (Object.keys(result).length === 0 && result.constructor === Object) {
      this.deleteUnlink(keyStorage)
    }
    return result;
  }

  async limparFiltroCaptarSomenteQuemTiverValor(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
    );
  }

  async armazenaNoRedisNoFinalRetornaResultado(name: string, key: string, options: any, repository: any, comparar_name_dashboard: string = '') {
    const hash = await generateCacheKey((name == comparar_name_dashboard) ? options.orgao : options);
    const keyStorage = `search:${name}:orgao:${key}:hash:${hash}`;

    await this.armazenarDadosNoRedis(keyStorage, options, repository);
    const result = await this.obterResultadoDoRedis(keyStorage);
    await this.incrementAcesstoKey(`search:${name}:orgao:${key}:access_count`, keyStorage);

    return result;
  }

  async eliminarUmaKey(chave: string) {
    await this.deleteHashField(chave, 'results')
    await this.deleteHashField(chave, 'filters')
  }

  async eliminarTodaKyeRelacionada(keyRelacionada: string) {
    await Redis.del(keyRelacionada)
  }
}


////Exemplos
/* const acess = await this.redis.getMoreAcessKeys('funcionario', orgao.id, 3);
  console.log(acess) */
//console.log(JSON.parse((await this.redis.retrieveHashField('search:funcionario:orgao:346:hash:110bad8581aab3177e5dbc879d1e94b8','filters'))??'{}'))
// this.redis.deleteAllData();
