function not_found(ApiRoute, Route): void {
  ApiRoute(() => {
    Route.get('/', async () => {  
      return {
        message: 'Rota não encontrada'
      }
    })
  })
}

export default not_found;