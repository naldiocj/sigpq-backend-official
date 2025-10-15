
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'MesController.index')
            Route.get('/:id', 'MesController.show')
            Route.post('/', 'MesController.store')
            Route.patch('/:id', 'MesController.update')
            Route.delete('/:id', 'MesController.delete')
        }).prefix('/mes')
    })
}
