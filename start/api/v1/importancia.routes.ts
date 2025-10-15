
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'ImportanciasController.index')
            Route.get('/:id', 'ImportanciasController.show')
            Route.post('/', 'ImportanciasController.store')
            Route.patch('/:id', 'ImportanciasController.update')
            Route.delete('/:id', 'ImportanciasController.delete')
        }).prefix('/config/tipo-importancias')
    })
}
