
import Env from '@ioc:Adonis/Core/Env'
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";




export const url = {
    PROTOCOL: Env.get('PORTOCOLO', 'http'),
    PORT: parseInt(Env.get('API_PORT', 3333), 10),
    API_VERSION: Env.get('API_VERSION', '/api/v1'),
    HOST: Env.get('HOST', 'localhost'),
    
  }
   


export const Axios = axios.create({
  baseURL: `${url.PROTOCOL}://${url.HOST}:${url.PORT}`,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});


Axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(new Error("Sem conexão com o servidor."));
    }

    const status = error.response.status;

    const mensagensErro: Record<number, string> = {
      400: "Não foi possível realizar a operação.",
      401: "Não tens autorização para acessar.",
      404: "Item não encontrado.",
      500: "Erro interno do servidor. Contacte o adminstrador.",
      0: "Erro interno do servidor. Contacte o adminstrador.",
    };

    return Promise.reject(
      new Error(mensagensErro[status] || "Erro desconhecido.")
    );
  }
);
