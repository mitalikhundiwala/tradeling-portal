"use server";

import { signIn } from "@/auth";
import { SignInOptions } from "next-auth/react";

export async function doCredentialLogin(data: SignInOptions) {
  try {
    const response = await signIn("credentials", { ...data });

    return response;
  } catch (err) {
    throw err;
  }
}
