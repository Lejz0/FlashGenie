import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7059/api',
});

export default axiosInstance;
