
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'TipoNaturezasController.index')
            Route.get('/:id', 'TipoNaturezasController.show')
            Route.post('/', 'TipoNaturezasController.store')
            Route.patch('/:id', 'TipoNaturezasController.update')
            Route.delete('/:id', 'TipoNaturezasController.delete')
        }).prefix('/config/naturezas')
    })
}
                                        