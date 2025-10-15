export default function authentication(ApiRoute, Route) {
    ApiRoute((): void => {
        Route.post('/login', 'Auth/LoginController.authenticate')
        Route.post('/logout', 'Auth/LoginController.logout')
    })
}