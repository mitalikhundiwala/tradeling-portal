import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      email: string;
      firstName: string;
      lastName: string;
      accessToken: string;
      roles: IRole[];
      permissions: string[];
    };
  }
}
