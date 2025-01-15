/* eslint-disable */

"use server";

import axios, {
  AxiosRequestConfig,
  AxiosError,
  ResponseType,
  AxiosResponse,
} from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHeaders, getApiUrlFromRoot } from "@/lib/global.config";
import { HttpErrorClass } from "@/lib/http-error";
import {
  TL_AUTH_TOKEN,
  TL_REFRESH_TOKEN,
  COOKIE_EXPIRY_TIME,
} from "@/constant";

export const updateAccessTokenRequest = async (data = {}) => ({
  method: "POST",
  headers: getHeaders(["JSON"]),
  url: getApiUrlFromRoot("/auth/v1/refreshToken"),
  data,
});

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

interface IErrorResponse {
  statusCode?: number;
  message?: string;
}

export const successResponse = async (
  response: AxiosResponse<IDefaultSuccessResponse>,
) => {
  return {
    code: response.status,
    message: response.statusText,
    data: response?.data?.data ?? response.data,
  };
};

export const throwHttpError = async (error: AxiosError<IErrorResponse>) => {
  const statusCode: number = error.response?.data?.statusCode ?? -1;
  const message: string = error.response?.data?.message ?? "";
  const httpError = new HttpErrorClass(statusCode, message);
  throw httpError;
};

const _updateAccessToken = async (): Promise<{
  accessToken: string;
} | null> => {
  const cookie = await cookies();
  const refreshToken = cookie.get("auth.refresh");
  try {
    const params = {
      refreshToken,
    };
    const res = await request(await updateAccessTokenRequest(params));
    cookie.set(TL_AUTH_TOKEN, res.data.accessToken, {
      path: "/",
      maxAge: COOKIE_EXPIRY_TIME,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookie.set(TL_REFRESH_TOKEN, res.data.refreshToken, {
      path: "/",
      maxAge: COOKIE_EXPIRY_TIME,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return {
      accessToken: res.data.accessToken,
    };
  } catch (error) {
    throw error;
  }
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const cookieStore = await cookies();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return new Promise((resolve, reject) => {
        _updateAccessToken()
          ?.then((res: any) => {
            originalRequest.headers["Authorization"] =
              "Bearer " + res?.accessToken;
            resolve(axios(originalRequest));
          })
          .catch((err: any) => {
            cookieStore.set(TL_AUTH_TOKEN, "", {
              path: "/",
              maxAge: -1,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            });
            cookieStore.set(TL_REFRESH_TOKEN, "", {
              path: "/",
              maxAge: -1,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            });
            redirect("/login");
          });
      });
    }

    return Promise.reject(error);
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareRequestHeaders = async (headers: any = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TL_AUTH_TOKEN);
  const modifiedHeaders = { ...headers };
  if (accessToken) {
    modifiedHeaders.Authorization = `Bearer ${accessToken}`;
  }

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

const request = async (request: IRequestConfig) => {
  const axiosConfig = await prepareAxiosConfiguration(request);
  return axios.request(axiosConfig).then(successResponse, throwHttpError);
};

export default request;
