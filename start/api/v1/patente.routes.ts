
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'PatenteController.index')
            Route.get('/:id', 'PatenteController.show')
        }).prefix('/patente')
    })
}
