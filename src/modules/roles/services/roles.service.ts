import request from "@/lib/request";
import { IPermission, IRole } from "../models/role.model";
import { map } from "lodash";

export interface IRolePage {
  items: IRole[];
  totalCount: number;
}

export interface IRetrieveRolesApiParams {
  page?: string;
  limit?: string;
}

export interface ICreateRolePayload {
  roleName: string;
  permissionIds: string[];
}

export const prepareRoleListRequest = (params: IRetrieveRolesApiParams) => ({
  method: "GET",
  url: "https://account-management-service-gden.onrender.com/role/getAllRoles",
  data: params,
});

export const preparePermissionsListRequest = () => ({
  method: "GET",
  url: "https://account-management-service-gden.onrender.com/permission/getAllPermissions",
});

export const prepareAddNewRoleRequest = (payload: ICreateRolePayload) => ({
  method: "POST",
  url: "https://account-management-service-gden.onrender.com/role",
  data: {
    ...payload,
    permissionIds: map(payload.permissionIds, (datum) => Number(datum)),
  },
});

export default class RolesService {
  static async retrieveRolesList(
    params: IRetrieveRolesApiParams
  ): Promise<IRolePage> {
    const response = await request(prepareRoleListRequest(params));
    return {
      items: response.data.roleList,
      totalCount: response.data?.totalCount ?? 100,
    };
  }

  static async retrievePermissionsList(): Promise<IPermission[]> {
    const response = await request(preparePermissionsListRequest());
    const permissions: IPermission[] = map(
      response.data.permissionList,
      (datum) => {
        return {
          value: datum.id,
          label: datum.label,
        };
      }
    );
    return permissions;
  }

  static async createNewRole(payload: ICreateRolePayload): Promise<boolean> {
    await request(prepareAddNewRoleRequest(payload));
    return true;
  }
}
