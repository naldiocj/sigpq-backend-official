export default function users(ApiRoute, Route): void {
  ApiRoute((): void => {
    Route.group((): void => {
      Route.get('/', 'UserController.index').middleware(['can:user-index'])
      Route.get('/:id', 'UserController.show').middleware('can:user-show')
      Route.post('/', 'UserController.store').middleware('can:user-store')
      Route.put('/:id', 'SgpqUtilizadorsController.update')
      Route.patch('/:id', 'UserController.update').middleware('can:user-update')
      Route.delete('/:id', 'UserController.delete').middleware('can:user-delete')
    }).prefix('/users').middleware(['auth', 'validateToken'])
  })
}