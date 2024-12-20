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
  accessToken: string;
  roles: IRole[];
  permissions: string[];
}

export function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName.charAt(0).toUpperCase(); // Get first letter of firstName
  const lastInitial = lastName.charAt(0).toUpperCase(); // Get first letter of lastName
  return firstInitial + lastInitial; // Concatenate initials
}
