import crypto from 'crypto';

// Função para gerar um hash MD5 a partir de uma string
function generateMD5Hash(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex');
}

// Função para gerar uma chave de cache com base nos filtros
export default async function generateCacheKey(filters: any): Promise<string> {
  // Ordena os filtros para garantir consistência
  const filtersString = JSON.stringify(filters, (key, value) => {
    return value === null || value === undefined ? undefined : value;
  });

  // Gera um hash MD5 da string dos filtros
  return generateMD5Hash(filtersString);
}
