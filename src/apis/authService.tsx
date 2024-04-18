import httpClient from './httpClient';
import { AxiosError } from 'axios';

interface UserData {
  email: string;
  nickname: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

// 회원가입
export const registerUser = async (userData: UserData) => {
  try {
    const response = await httpClient.post('/users', userData);
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError; // 타입 단언
    if (typedError.response) {
      throw typedError.response.data; // 오류 응답 바디 접근
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const login = async (credentials: Credentials) => {
  try {
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    if (typedError.response) {
      throw typedError.response.data || 'Login failed';
    } else {
      throw new Error('Network error');
    }
  }
};
