
export default function roles(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            Route.get('/', 'RoleController.index').middleware(['can:role-index'])
            Route.get('/:id', 'RoleController.show').middleware('can:role-show')
            Route.post('/', 'RoleController.store').middleware('can:role-store')
            Route.patch('/:id', 'RoleController.update').middleware('can:role-update')
            Route.delete('/:id', 'RoleController.delete').middleware('can:role-delete')
        }).prefix('/roles')
    })
}
