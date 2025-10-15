
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'RoleController.index')
            Route.get('/:id', 'RoleController.show')
            Route.post('/', 'RoleController.store')
            Route.patch('/:id', 'RoleController.update')
            Route.delete('/:id', 'RoleController.delete')
        }).prefix('/config/roles')
    })
}
