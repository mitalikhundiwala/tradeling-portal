export interface IRole {
  id: number;
  name: string;
}

export interface ILoggedInUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  roles: IRole[];
  permissions: string[];
}

export interface ISession {
  accessToken?: string | null;
  refreshToken?: string | null;
  roles?: IRole[] | null;
  permissions?: string[] | null;
}

export interface IToken {
  accessToken?: string | null;
  refreshToken?: string | null;
  roles?: IRole[] | null;
  permissions?: string[] | null;
}

export function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName.charAt(0).toUpperCase(); // Get first letter of firstName
  const lastInitial = lastName.charAt(0).toUpperCase(); // Get first letter of lastName
  return firstInitial + lastInitial; // Concatenate initials
}
