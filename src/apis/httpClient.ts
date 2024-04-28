import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConfig';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('No token available');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default httpClient;
