"use server";

import {
  FcvResults,
  getFcvResultsApi,
  GetFcvResultsQuery,
} from "@/lib/api/backend";
import { cookies } from "next/headers";

export async function getFcvResults(
  query: GetFcvResultsQuery
): Promise<FcvResults[]> {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    throw new Error("Invalid Request");
  }

  console.log("Processing cough sample");

  return getFcvResultsApi(query, token.value);
}
