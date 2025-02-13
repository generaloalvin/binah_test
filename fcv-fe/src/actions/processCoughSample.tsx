"use server";

import {
  processCoughSampleApi,
  ProcessCoughSampleBody,
} from "@/lib/api/backend";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function processCoughSample(body: ProcessCoughSampleBody) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  console.log("Token", token);

  if (!token) {
    redirect("/");
    return;
  }

  console.log("Processing cough sample");
  await processCoughSampleApi(body, token.value);
}
