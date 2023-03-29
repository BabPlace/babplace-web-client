import axios from 'axios';

export const GAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

GAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // TODO: error handling
    return Promise.reject(error);
  }
);
