export enum ContentType {
  JSON = "JSON",
  FORM_URL_ENCODED = "FORM_URL_ENCODED",
  MULTIPART_FORM_DATA = "MULTIPART_FORM_DATA",
}

export type RequestHeaders = { [key: string]: string };

const HEADERS: { [key: string]: RequestHeaders } = {
  [ContentType.JSON]: {
    "Content-Type": "application/json",
  },
  [ContentType.FORM_URL_ENCODED]: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  [ContentType.MULTIPART_FORM_DATA]: {
    "Content-Type": "multipart/form-data",
  },
};

export const prepareHeaders = (headersFor: string[]): RequestHeaders => {
  let requestHeaders: RequestHeaders = {};
  headersFor.forEach((datum) => {
    const header = HEADERS[datum];
    requestHeaders = {
      ...requestHeaders,
      ...header,
    };
  });
  return requestHeaders;
};

const getAPIRootURLWithProtocol = (configAPIRoot: string): string => {
  if (!configAPIRoot) {
    return "";
  }

  const url = new URL(configAPIRoot);
  return url.toString();
};

export const getHeaders = (headersFor: string[]): RequestHeaders => {
  return prepareHeaders(headersFor);
};

export const getApiUrlFromRoot = (url: string) => {
  return getAPIRootURLWithProtocol(config.API_ROOT) + url;
};

export enum Environment {
  LOCAL = "local",
  DEV = "dev",
  QA = "qa",
  PROD = "prod",
  MOCK = "mock",
}

export interface IConfig {
  currentEnvironment: string;
  API_ROOT: string;
  getApiUrlFromRoot: (relativePath: string) => string;
  getHeaders: (headersFor: string[]) => RequestHeaders;
}

const config: IConfig = {
  currentEnvironment: "https://hub-service-uxh1.onrender.com/hub-service",
  API_ROOT: "https://hub-service-uxh1.onrender.com/hub-service",
  getApiUrlFromRoot,
  getHeaders,
};

export default config;
