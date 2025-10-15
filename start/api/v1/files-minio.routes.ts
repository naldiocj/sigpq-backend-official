export default function files(ApiRoute, Route): void {
  ApiRoute((): void => {
    Route.group((): void => {
      Route.post('/', 'ArquivoController.upload')
      Route.get('/', 'ArquivoController.getUrl')
      Route.get('/object', 'ArquivoController.getObject')
      Route.delete('/', 'ArquivoController.delete')
    }).prefix('/files-minio')
  })
}
