import axios, { AxiosError } from 'axios';

export const GAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

GAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return Promise.reject(axiosError);
    }
    return Promise.reject(error);
  }
);
