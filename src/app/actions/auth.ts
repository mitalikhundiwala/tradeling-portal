"use server";
import request from "@/app/actions/request";
import { getApiUrlFromRoot } from "@/lib/global.config";
import { cookies } from "next/headers";
import {
  TL_AUTH_TOKEN,
  TL_REFRESH_TOKEN,
  COOKIE_EXPIRY_TIME,
} from "@/constant";
import { redirect } from "next/navigation";

export interface IAuthRequestParams {
  email: string;
  password: string;
}

export const prepareLoginRequest = async (data: IAuthRequestParams) => ({
  method: "POST",
  url: getApiUrlFromRoot("/auth/login"),
  data,
});

export const login = async (data: IAuthRequestParams) => {
  const cookie = await cookies();
  const payload = {
    email: data.email,
    password: atob(data.password),
  };

  const res = await request(await prepareLoginRequest(payload));

  cookie.set(TL_AUTH_TOKEN, res.data.accessToken, {
    path: "/",
    maxAge: COOKIE_EXPIRY_TIME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  cookie.set(TL_REFRESH_TOKEN, res.data.refreshToken, {
    path: "/",
    maxAge: COOKIE_EXPIRY_TIME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
};

export const logout = async () => {
  const cookie = await cookies();
  cookie.set(TL_AUTH_TOKEN, "", {
    path: "/",
    maxAge: -1,
    httpOnly: true,
  });
  cookie.set(TL_REFRESH_TOKEN, "", {
    path: "/",
    maxAge: COOKIE_EXPIRY_TIME,
    httpOnly: true,
  });
  redirect("/login");
};
