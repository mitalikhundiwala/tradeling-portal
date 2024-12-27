import axios, {
  AxiosRequestConfig,
  AxiosError,
  ResponseType,
  AxiosResponse,
} from "axios";
import { TradelingHttpErrorClass } from "@/lib/http-error";
import { getHeaders } from "@/lib/global.config";

interface IErrorResponse {
  statusCode?: number;
  message?: string;
}

export interface IDefaultSuccessResponse {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface IRequestConfig {
  method: string;
  url: string;
  responseType?: ResponseType;
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // return new Promise((resolve, reject) => {
      //   AuthService.updateAccessToken()
      //     ?.then((res: any) => {
      //       originalRequest.headers["Authorization"] =
      //         "Bearer " + res?.accessToken;
      //       resolve(axios(originalRequest));
      //     })
      //     .catch((err: any) => {
      //       // AuthRepository.clear();

      //       // store.dispatch(logout());
      //       reject(err);
      //     });
      // });
    }

    return Promise.reject(error);
  },
);

export const throwHttpError = (error: AxiosError<IErrorResponse>) => {
  const statusCode: number = error.response?.data?.statusCode ?? -1;
  const message: string = error.response?.data?.message ?? "";
  const httpError = new TradelingHttpErrorClass(statusCode, message);
  throw httpError;
};

export const successResponse = (
  response: AxiosResponse<IDefaultSuccessResponse>,
) => {
  return {
    code: response.status,
    message: response.statusText,
    data: response?.data?.data ?? response.data,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareRequestHeaders = async (headers: any = {}) => {
  const modifiedHeaders = { ...headers };
  //const token = await AuthRepository.getAuthDetails();
  //const accessToken = token?.accessToken;

  // if (accessToken) {
  //   modifiedHeaders.Authorization = `Bearer ${accessToken}`;
  // }

  return modifiedHeaders;
};

export const prepareAxiosConfiguration = async (
  request: IRequestConfig,
): Promise<AxiosRequestConfig> => {
  const {
    method,
    responseType = "json",
    data,
    headers = getHeaders(["JSON"]),
    url,
  } = request;

  const requestHeaders = await prepareRequestHeaders(headers);

  let requestConfig: AxiosRequestConfig = {
    method,
    url,
    responseType,
    headers: requestHeaders,
  };

  if (method === "GET" && data) {
    requestConfig = {
      ...requestConfig,
      params: data,
    };
  }

  if (method !== "GET" && data) {
    requestConfig = {
      ...requestConfig,
      data,
    };
  }

  return requestConfig;
};

const httpRequest = async (request: IRequestConfig) => {
  const axiosConfig = await prepareAxiosConfiguration(request);

  return axios.request(axiosConfig).then(successResponse, throwHttpError);
};

export default httpRequest;
