import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import Env from "@ioc:Adonis/Core/Env";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

const url = {
  PROTOCOL: Env.get("PROTOCOL", "http"),
  PORT: parseInt(Env.get("API_PORT", "3333"), 10),
  HOST: Env.get("HOST", "localhost"),
};

export default class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${url.PROTOCOL}://${url.HOST}:${url.PORT}`,
      timeout: 100000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (!error.response) {
          return Promise.reject(new Error("Sem conexão com o servidor."));
        }

        const status = error.response.status;
        const mensagensErro: Record<number, string> = {
          400: "Não foi possível realizar a operação.",
          401: "Não tens autorização para acessar.",
          404: "Item não encontrado.",
          500: "Erro interno do servidor. Contacte o administrador.",
          0: "Erro interno do servidor. Contacte o administrador.",
        };

        const mensagem = mensagensErro[status] || "Erro desconhecido.";
        return Promise.reject(new Error(mensagem));
      }
    );
  }

  public async request<T, D = any>(
    config: AxiosRequestConfig<D>,
    ctx?: HttpContextContract
  ): Promise<AxiosResponse<T>> {
    if (ctx?.token) {
      config.headers = {
        ...config.headers,

        Authorization: `${ctx.token}`,
      };
      config.params = {
        ...config.params,
      };
    }


    return await this.axiosInstance.request<T>(config);
  }

  public async get<T>(
    url: string,
    ctx?: HttpContextContract,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.request<T>(
      {
        ...config,
        method: 'GET',
        url,
        params,
      },
      ctx
    )
    return response.data // Retorna apenas os dados
  }

  public async post<T, D = any>(
    url: string,
    data: D,
    ctx?: HttpContextContract,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.request<T, D>(
      {
        ...config,
        method: 'POST',
        url,
        data,
        params,
      },
      ctx
    )
    return response.data // Retorna apenas os dados
  }

}
