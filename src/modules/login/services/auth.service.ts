import request from "@/lib/request";
import { getApiUrlFromRoot } from "@/lib/global.config";
import { ResponseTransformer } from "./response.transformer";
import { ILoggedInUser } from "@/modules/common/models/user";

export interface IAuthRequestParams {
  username: string;
  password: string;
}

export const prepareLoginRequest = (data = {}) => ({
  method: "POST",
  url: getApiUrlFromRoot("/auth/login"),
  data,
});

export class AuthService {
  static async authenticate({
    username,
    password,
  }: IAuthRequestParams): Promise<ILoggedInUser> {
    const _params = {
      email: username,
      password: password,
    };

    const response = await request(prepareLoginRequest(_params));
    const user = ResponseTransformer.fromServerResponse(response.data);
    return user;
  }
}
