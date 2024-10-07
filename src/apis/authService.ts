import createHttpClient from './createHttpClient';

const httpClient = createHttpClient();

interface UserData {
  email: string;
  nickname: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

export const authService = {
  registerUser: async (userData: UserData) => await httpClient.post('/users', userData),
  login: async (credentials: Credentials) => await httpClient.post('/auth/login', credentials),
};
