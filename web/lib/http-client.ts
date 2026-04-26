import { API_BASE_URL } from "@/config/env";

export async function http<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const errorData = await response.json();
      message = errorData?.message || message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
}