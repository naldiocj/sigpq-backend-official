
export default function estado_civil(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'EstadoCivilController.index')
            Route.get('/:id', 'EstadoCivilController.show')
            Route.post('/', 'EstadoCivilController.store')
            Route.patch('/:id', 'EstadoCivilController.update')
            Route.delete('/:id', 'EstadoCivilController.delete')
        }).prefix('/estado-civil')
    })
}
