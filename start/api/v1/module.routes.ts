
export default function permissions(ApiRoute, Route): void {
    ApiRoute(() => {
        Route.group(() => {
            // Route.get('/', function() {
            //   return Permission.all()
            // }).middleware(['can:permission-index']) 
            Route.get('/', 'ModulosController.index')//.middleware('can:permission-show')
            // Route.get('/:id', 'ModulosController.show').middleware('can:permission-show')
            // Route.post('/', 'ModulosController.store').middleware('can:role-store')
            // Route.patch('/:id', 'ModulosController.update').middleware('can:role-update')
            // Route.delete('/:id', 'ModulosController.delete').middleware('can:role-delete')
        }).prefix('/config/modulos')
    })
}