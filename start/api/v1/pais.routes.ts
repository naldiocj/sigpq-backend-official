
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'PaisController.index')
            Route.get('/:id', 'PaisController.show')
            Route.post('/', 'PaisController.store')
            Route.patch('/:id', 'PaisController.update')
            Route.delete('/:id', 'PaisController.delete')
        }).prefix('/pais')
    })
}
