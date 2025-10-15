
export default function estado_civil(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'PnaAgentesController.index')
            Route.get('/:id', 'PnaAgentesController.show')
        }).prefix('/pna-agentes')
    })
}
