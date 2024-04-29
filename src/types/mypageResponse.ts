export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const initialUserInfo: UserInfo = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: '',
  updatedAt: '',
};
