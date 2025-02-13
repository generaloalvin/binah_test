"use server";

import { loginApi } from "@/lib/api/backend";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(formdata: FormData) {
  console.log("login action", formdata);
  const { success, data, error } = loginSchema.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
  });

  if (!success) {
    return { errors: error.errors };
  }

  // LOGIN LOGIC HERE
  const response = await loginApi(data.email, data.password);

  if (!response.success) {
    return { errors: ["Invalid credentials"] };
  }

  const cookieStore = await cookies();

  cookieStore.set("token", response.token!);

  redirect("/fcv");
}
