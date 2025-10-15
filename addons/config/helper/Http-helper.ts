type HttpResponse = {
  statusCode: number;
  object: any;
  message: string;
}

const responses = [
  { status: 200, name: 'ok', defaultMessage: null },
  { status: 201, name: 'created', defaultMessage: 'Informação criada!' },
  { status: 400, name: 'badRequest', defaultMessage: 'Não foi possivel realizar acção!' },
  { status: 401, name: 'unauthorized', defaultMessage: 'Sem permissão para realizar está ação!' },
  { status: 403, name: 'forbidden', defaultMessage: 'Proibido' },
  { status: 404, name: 'notFound', defaultMessage: 'Recurso não encontrado!' }
]

const responseBaseHelper = (statusCode: number, object: any, message?: string): HttpResponse => {
  const defaultResponse = responses.find(response => response.status === statusCode);
  return {
    statusCode,
    object,
    message: message || defaultResponse?.defaultMessage || 'Resposta padrão'
  };
}

const ok = (object: any, message?: string) => responseBaseHelper(200, object, message);
const created = (object: any, message?: string) => responseBaseHelper(201, object, message);
const badRequest = (object: any, message?: string) => responseBaseHelper(400, object, message);
const notFound = (object: any, message?: string) => responseBaseHelper(404, object, message);
// Aqui estão as funções para os códigos de status 401 e 403
const unauthorized = (object: any, message?: string) => responseBaseHelper(401, object, message);
const forbidden = (object: any, message?: string) => responseBaseHelper(403, object, message);

export {
  badRequest,
  ok,
  created,
  notFound,
  unauthorized,
  forbidden
}
