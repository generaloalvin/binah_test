import { TestType } from "../constants";

export interface LoginResponse {
  success: boolean;
  token?: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

export interface ProcessCoughSampleBody {
  cough_sample: File;
  test_type: TestType[];
}

export const processCoughSampleApi = async (body: ProcessCoughSampleBody, token: string): Promise<void> => {
  const formData = new FormData();
  formData.append("file", body.cough_sample);
  formData.append("test_type", body.test_type.join(","));

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/fcv`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to process cough sample");
  }
}
