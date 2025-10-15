import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import HttpService from "../HttpService";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  [key: string]: any;
}

export default class BaseHttpService {
  protected baseURL: string;
  protected base: string = "/api/v1";
  protected token: string | null;
  protected httpService: HttpService;

  constructor(baseURL: string, ctx: HttpContextContract) {
    this.baseURL = `${this.base}${baseURL}`;
    this.token = ctx.token;
    this.httpService = new HttpService();
  }

  public async listarTodos<T>(options: any = {}): Promise<T> {
    try {
      return await this.httpService.get<T>(
        this.baseURL,
        { token: this.token } as HttpContextContract,
        options || {},
        { headers: options.headers }
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async listarUm<T>(
    id: number | string,
    options: RequestOptions = {}
  ): Promise<T> {
    try {
      return await this.httpService.get<T>(
        `${this.baseURL}/${id}`,
        { token: this.token } as HttpContextContract,
        options.params || {},
        { headers: options.headers }
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
