import axios from 'axios';
import { getAuthorizationHeader, getAuthorizationRefreshHeader } from '@/entities/Session';

const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_PORT}`,
  baseURL: 'http://localhost:8080/',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  config.headers.Authorization = getAuthorizationHeader(); // Update the Authorization header before each request
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  config => config,
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/local/signin" && err.response) {
      if (err.response.status === 401 && originalConfig.url !== "/auth/refresh") {
        try {
          const rs = await axios.post(
            `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/auth/refresh`,
            {},
            {
              headers: {
                Accept: 'application/json, text/plain, */*',
                Authorization: getAuthorizationRefreshHeader(),
                'Content-Type': 'application/json',
              },
            }
          );
          if (rs.data) {
            const { accessToken, refreshToken } = rs.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
          }
        } catch (_error) {
          localStorage.clear();
          return Promise.reject(_error);
        }
      }
    } 
    // else if(err.message === "Network Error" && !err.response){
      
    // }
  }
);

export const $api = api;