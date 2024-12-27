import { ILoggedInUser } from "@/modules/common/models/user";

export class ResponseTransformer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromServerResponse(userData: any): ILoggedInUser {
    const { id, firstName, lastName, email, accessToken, refreshToken } =
      userData;

    return {
      id,
      email: email,
      firstName,
      lastName,
      accessToken,
      refreshToken,
      permissions: [],
      roles: [],
      emailVerified: null,
    };
  }
}
