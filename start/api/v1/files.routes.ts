
import Application from '@ioc:Adonis/Core/Application'

export default function files(ApiRoute, Route): void {
    ApiRoute((): void => {
        Route.group((): void => {

            Route.get('/', async ({ request, response }) => {
                const { url } = request.all()
                if (!url) return
                return response.download(Application.publicPath(`../app/@piips/files/${url}`))
            })

            // Route.get('/:pessoaId', async ({ params, request, response }) => {
            // const { nome } = request.all()
            // return response.download(Application.publicPath(`../app/@piips/files/${nome}`))
            // return response.download(Application.publicPath(`../app/@piips/files/${params.filename}`))
            // })

        }).prefix('/files')
    })
}
