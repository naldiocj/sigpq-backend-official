export default function permissions(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {
            // Route.get('/', function() {
            //   return Permission.all()
            // }).middleware(['can:permission-index']) 
            Route.get('/', 'PermissionController.index')

            // .middleware('can:permission-show')
            // Route.get('/:id', 'RoleController.show').middleware('can:permission-show')
            // Route.post('/', 'RoleController.store').middleware('can:role-store')
            Route.put('/:id', 'PermissionController.update')
            Route.put('/:id/toggle-activo', 'PermissionController.toggleActivo')
            Route.patch('/:id', 'PermissionController.update')
            // .middleware('can:role-update')
           
            // Route.delete('/:id', 'RoleController.delete').middleware('can:role-delete')
        }).prefix('/permissions')
    })
}
