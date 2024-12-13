export interface IRole {
  id: number;
  name: string;
}

export interface IUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: IRole[];
  permissions: string[];
}
