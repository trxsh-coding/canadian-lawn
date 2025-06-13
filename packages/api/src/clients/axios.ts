import { ENV } from '@config/env';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const apiClient = axios.create({
  baseURL: ENV.STRAPI_HOST ?? 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${ENV.STRAPI_TOKEN}`,
  },
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized — возможен редирект на логин');
    }
    if (error.response?.status === 500) {
      console.error('Internal server error');
    }
    return Promise.reject(error);
  }
);
