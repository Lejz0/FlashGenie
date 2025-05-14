import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7059/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('_auth');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
