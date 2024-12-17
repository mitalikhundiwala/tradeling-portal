import { AdapterUser } from "next-auth/adapters";

export interface IRole {
  id: number;
  name: string;
}

export interface IUser extends AdapterUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: IRole[];
  permissions: string[];
}
