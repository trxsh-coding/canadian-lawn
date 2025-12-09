import { ENV } from '@config/env';
import axios, { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';

export const apiClient = axios.create({
  method: 'GET',
  baseURL: ENV.STRAPI_HOST ?? 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${ENV.STRAPI_TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { encode: true, arrayFormat: 'indices' }),
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export function userClient(token: string) {
  return axios.create({
    baseURL: apiClient.defaults.baseURL,
    timeout: apiClient.defaults.timeout,
    withCredentials: apiClient.defaults.withCredentials,
    paramsSerializer: apiClient.defaults.paramsSerializer,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
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
