import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchData(endpoint: string) {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postData<T>(endpoint: string, data: T) {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateData<T>(endpoint: string, data: T) {
  try {
    const response = await apiClient.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteData(endpoint: string) {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default apiClient;
