import httpClient from './httpClient';
import { AxiosError } from 'axios';

interface UserData {
  email: string;
  nickname: string;
  password: string;
}

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
