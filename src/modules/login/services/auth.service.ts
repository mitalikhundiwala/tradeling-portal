import request from "@/lib/request";
import { getApiUrlFromRoot } from "@/lib/global.config";
import { ResponseTransformer } from "./response.transformer";
import { IUser } from "@/modules/common/models/user";

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
  }: IAuthRequestParams): Promise<IUser> {
    const _params = {
      email: username,
      password: password,
    };

    const response = await request(prepareLoginRequest(_params));
    const user = ResponseTransformer.fromServerResponse(response.data);
    return user;
  }

  // static async _updateAccessToken(): Promise<{
  //   accessToken: string;
  // } | null> {
  //   const refreshToken = AuthRepository.retrieveRefreshToken();
  //   const userId = AuthRepository.retrieveUserId();
  //   try {
  //     const params = {
  //       channel: "HPP",
  //       refreshToken,
  //       userId,
  //     };
  //     const res = await request(updateAccessTokenRequest(params));
  //     AuthRepository.storeAccessToken(res.data.accessToken);
  //     AuthRepository.storeRefreshToken(res.data.refreshToken);

  //     return {
  //       accessToken: res.data.accessToken,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
