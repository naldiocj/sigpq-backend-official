

export default function files(ApiRoute, Route): void {
  ApiRoute((): void => {
    Route.group(() => {
      Route.post("", "FileMinIosController.store");
      Route.get("files", "FileMinIosController.show");
      // Route.get('files', "FileMinIosController.delete")
    }).prefix("minios");
  })
}
