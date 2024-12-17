"use server";

import { signIn, signOut } from "@/auth";

export async function doCredentialLogin(data: any) {
  try {
    const response = await signIn("credentials", { ...data });

    return response;
  } catch (err) {
    throw err;
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
