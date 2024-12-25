import { deleteCookie } from "cookies-next/client";
import { ISession } from "@/modules/common/models/user";
import { auth } from "@/auth";

// Secret used in your NextAuth configuration

const TL_CALLBACK_URL = "auth.callback.url";
const TL_CSRF_TOKEN = "auth.token";

export class AuthRepository {
  static getAuthDetails = async (): Promise<{
    accessToken: string;
    refreshToken: string;
    userId: string;
  } | null> => {
    try {
      const session: ISession | null = await auth();

      if (!session || !session.user) {
        return null;
      }

      // Extract the token details
      const accessToken = session.accessToken as string; // Assuming `authCode` is added in session
      const refreshToken = session.refreshToken as string; // Assuming `refreshToken` is added in session
      const userId = session.user.id as string; // Default `user.id` from NextAuth

      return { accessToken, refreshToken, userId };
    } catch (error) {
      console.error("Error retrieving session:", error);
      throw error;
    }
  };

  static deleteCallBackUrl = () => {
    deleteCookie(TL_CALLBACK_URL);
  };

  static deleteToken = () => {
    deleteCookie(TL_CSRF_TOKEN);
  };

  static deleteAllCookies = () => {
    AuthRepository.deleteCallBackUrl();
    AuthRepository.deleteToken();
  };
}
