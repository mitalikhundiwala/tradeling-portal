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

export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleIds: number[];
}

export const prepareUserListRequest = (params: IRetrieveUserApiParams) => ({
  method: "GET",
  // url: getApiUrlFromRoot("/users/getAllUsers"),
  url: "https://account-management-service-gden.onrender.com/users/getAllUsers",
  data: params,
});

export const prepareAddNewUserRequest = (payload: ICreateUserPayload) => ({
  method: "POST",
  // url: getApiUrlFromRoot("/users/getAllUsers"),
  url: "https://account-management-service-gden.onrender.com/users",
  data: payload,
});

export default class UserService {
  static async retrieveUserList(
    params: IRetrieveUserApiParams,
  ): Promise<IUserPage> {
    const response = await request(prepareUserListRequest(params));
    return {
      items: response.data.userList,
      totalCount: response.data?.totalCount ?? 100,
    };
  }

  static async createNewUser(payload: ICreateUserPayload): Promise<boolean> {
    await request(prepareAddNewUserRequest(payload));
    return true;
  }
}
