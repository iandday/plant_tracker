import axios, { AxiosInstance } from 'axios';
import { BASE_PATH } from '../services/base';

const axiosInstance: AxiosInstance = axios.create({ baseURL: 'http://localhost:8080' });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response.status);
    // If the error status is 401 and there is no originalRequest._retry flag,
    // if (error.response.status === 401) {
    //   console.log('In');

    // }
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(BASE_PATH + '/user/renew', { refresh_token: refreshToken });
        const { access_token, refresh_token } = response.data;

        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', refresh_token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
      } catch (error) {
        console.log('refresh failed');
        window.location.href = '/login';
        //navigate('/login'); How do i do this?
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
