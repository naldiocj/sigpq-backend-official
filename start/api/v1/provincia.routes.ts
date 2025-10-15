
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'ProvinciasController.index')
            Route.get('/:id', 'ProvinciasController.show')
            Route.post('/', 'ProvinciasController.store')
            Route.patch('/:id', 'ProvinciasController.update')
            Route.put('/:id', 'ProvinciasController.update')
            Route.delete('/:id', 'ProvinciasController.delete')
        }).prefix('/provincias')
    })
}
