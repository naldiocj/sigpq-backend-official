
export default function route(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'EstruturaOrganicasController.index')
            Route.get('/:id', 'EstruturaOrganicasController.show')
            Route.post('/', 'EstruturaOrganicasController.store')
            Route.patch('/:id', 'EstruturaOrganicasController.update')
            Route.delete('/:id', 'EstruturaOrganicasController.delete')
        }).prefix('/config/estrutura-organicas')
    })
}
