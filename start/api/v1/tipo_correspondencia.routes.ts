
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'TipoCorrespondenciasController.index')
            Route.get('/:id', 'TipoCorrespondenciasController.show')
            Route.post('/', 'TipoCorrespondenciasController.store')
            Route.patch('/:id', 'TipoCorrespondenciasController.update')
            Route.delete('/:id', 'TipoCorrespondenciasController.delete')
        }).prefix('/config/tipo-correspondencias')
    })
}
