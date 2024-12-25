import request from "@/lib/request";
import { IUser } from "@/modules/users/models/user.model";
import { getApiUrlFromRoot } from "@/lib/global.config";

export interface IUserPage {
  items: IUser[];
  page: number;
  limit: number;
  totalCount: number;
}

export interface IRetrieveUserApiParams {
  page?: number;
  limit?: number;
}

export const prepareUserListRequest = (params: IRetrieveUserApiParams) => ({
  method: "GET",
  url: getApiUrlFromRoot("/users/getAllUsers"),
  data: params,
});

export default class UserService {
  static async retrieveUserList(
    params: IRetrieveUserApiParams,
  ): Promise<IUserPage> {
    let response = null;
    response = await request(prepareUserListRequest(params));
    return {
      items: response.data.userList,
      totalCount: response.data?.totalCount ?? 100,
      page: response.data?.feeds?.page ?? 1,
      limit: response.data?.feeds?.limit ?? 10,
    };
  }
}
