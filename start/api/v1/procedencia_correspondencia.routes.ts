
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'ProcedenciaCorrespondenciasController.index')
            Route.get('/:id', 'ProcedenciaCorrespondenciasController.show')
            Route.post('/', 'ProcedenciaCorrespondenciasController.store')
            Route.patch('/:id', 'ProcedenciaCorrespondenciasController.update')
            Route.delete('/:id', 'ProcedenciaCorrespondenciasController.delete')
        }).prefix('/config/procedencia-correspondencias')
    })
}
