import { getCookie, setCookie } from "cookies-next/client";

export const USER_ID_STORE_KEY = "auth.userId";
export const ACCESS_TOKEN_STORE_KEY = "auth.access.token";
export const REFRESH_TOKEN_STORE_KEY = "auth.refresh.token";
export const SELECTED_COUNTRY_KEY = "auth.country";

export class AuthRepository {
  static storeUserId(token: string): void {
    setCookie(USER_ID_STORE_KEY, token);
  }

  static storeAccessToken(token: string): void {
    setCookie(ACCESS_TOKEN_STORE_KEY, token);
  }

  static storeRefreshToken(token: string): void {
    setCookie(REFRESH_TOKEN_STORE_KEY, token);
  }

  static retrieveAccessToken(): string | null {
    const token = getCookie(ACCESS_TOKEN_STORE_KEY);
    if (!token) {
      return null;
    }
    return token;
  }

  static retrieveRefreshToken(): string | null {
    const token = getCookie(REFRESH_TOKEN_STORE_KEY);
    if (!token) {
      return null;
    }
    return token;
  }

  static hasToken(): boolean {
    const token = AuthRepository.retrieveAccessToken();
    return token ? true : false;
  }
}
