import axios, { AxiosInstance  } from 'axios';

const createAPI = (baseURL: string): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL,
  });

  return api;
};

export default createAPI;