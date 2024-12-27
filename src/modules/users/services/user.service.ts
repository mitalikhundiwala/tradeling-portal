import request from "@/lib/request";
import { IUser } from "@/modules/users/models/user.model";

export interface IUserPage {
  items: IUser[];
  totalCount: number;
}

export interface IRetrieveUserApiParams {
  page?: string;
  limit?: string;
}

export const prepareUserListRequest = (params: IRetrieveUserApiParams) => ({
  method: "GET",
  // url: getApiUrlFromRoot("/users/getAllUsers"),
  url: "https://account-management-service-gden.onrender.com/users/getAllUsers",
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
    };
  }
}
