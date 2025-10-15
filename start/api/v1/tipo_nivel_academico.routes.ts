
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'TipoNivelAcademicosController.index')
            Route.get('/:id', 'TipoNivelAcademicosController.show')
            Route.post('/', 'TipoNivelAcademicosController.store')
            Route.patch('/:id', 'TipoNivelAcademicosController.update')
            Route.delete('/:id', 'TipoNivelAcademicosController.delete')
        }).prefix('/config/tipo-nivel-academicos')
    })
}
                                        