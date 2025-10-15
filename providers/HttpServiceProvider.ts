import { ApplicationContract } from "@ioc:Adonis/Core/Application";
import HttpService from "App/Service/HttpService";

export default class HttpServiceProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton("App/Service/HttpService", () => {
      return new HttpService();
    });
  }

  public async boot() {}
}
