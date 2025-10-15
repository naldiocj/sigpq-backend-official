
export default function regime(ApiRoute, Route): void {
  ApiRoute((): void => {
    Route.group((): void => {
      Route.get('/', 'RegimeController.index')
      Route.get('/:id', 'RegimeController.show')
    }).prefix('/regimes')
  })
}
