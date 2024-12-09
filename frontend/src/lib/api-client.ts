import axios from "axios";
import env from "./env";
import { parseDates } from "./utils";

const api = axios.create({
  baseURL: `${env.VITE_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => {
  response.data = parseDates(response.data);
  return response;
});

export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while making the request.",
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function postData<T>(endpoint: string, data: T) {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while making the request.",
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function updateData<T>(endpoint: string, data?: T) {
  try {
    const response = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while making the request.",
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function deleteData(endpoint: string) {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while making the request.",
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export default api;
