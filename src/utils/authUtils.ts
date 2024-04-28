export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('accessToken');
};
