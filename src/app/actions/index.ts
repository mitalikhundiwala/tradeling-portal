"use server";

import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export async function doCredentialLogin(data: any) {
  try {
    const response = await signIn("credentials", { ...data });
    //revalidatePath("/");
    return response;
  } catch (err) {
    throw err;
  }
}
