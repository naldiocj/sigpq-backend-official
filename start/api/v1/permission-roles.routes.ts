
export default function permissions(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            // Route.get('/', function() {
            //   return Permission.all()
            // }).middleware(['can:permission-index']) 
            Route.get('/', 'PermissionRolesController.index')
            // Route.get('/:id', 'RoleController.show').middleware('can:permission-show')
            Route.post('/', 'PermissionRolesController.store')
            // Route.patch('/:id', 'RoleController.update').middleware('can:role-update')
            // Route.delete('/:id', 'RoleController.delete').middleware('can:role-delete')
        }).prefix('/config/permission-roles')
    })
}
