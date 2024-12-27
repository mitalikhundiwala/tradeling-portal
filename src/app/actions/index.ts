"use server";

import { signIn, signOut } from "@/auth";
import { SignInOptions } from "next-auth/react";

export async function doCredentialLogin(data: SignInOptions) {
  try {
    const response = await signIn("credentials", { ...data });
    return response;
  } catch (err) {
    throw new Error(JSON.stringify(err));
  }
}

export async function logout() {
  try {
    const response = await signOut();

    return response;
  } catch (err) {
    throw err;
  }
}
