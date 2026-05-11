"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

export async function logout() {
  if (!API_URL) throw new Error("API_URL não definida");
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: cookie ? { cookie } : {},
    cache: "no-store",
  }).catch(() => {});

  for (const c of cookieStore.getAll()) {
    cookieStore.delete(c.name);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
