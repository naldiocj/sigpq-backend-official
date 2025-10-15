
const responses = [
  { status: 200, name: 'ok', defaultMessage: null },
  { status: 201, name: 'created', defaultMessage: 'Informação criada!' },
  { status: 400, name: 'badRequest', defaultMessage: 'Não foi possivel realizar acção!' },
  { status: 401, name: 'unauthorized', defaultMessage: 'Sem permissão para realizar está ação!' },
  { status: 403, name: 'forbidden', defaultMessage: 'Proibido' },
  { status: 404, name: 'notFound', defaultMessage: 'Recurso não encontrado!' }
]

const responseBaseHelper = (statusCode: number, object: any, message: string) => ({
  statusCode,
  object,
  message
})

const ok = (object: any, message: string) => responseBaseHelper(200, object, message);

const created = (object: any, message: string) => responseBaseHelper(201, object, message);

const badRequest = (object: any, message: string) => responseBaseHelper(400, object, message);

const notFound = (object: any, message: string) => responseBaseHelper(404, object, message);


module.exports = {
  badRequest,
  ok,
  created,
  notFound
}
