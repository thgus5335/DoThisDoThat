import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import defaultUser from '@/src/assets/images/defaultUser.png';
import styles from './AssigneeDropdown.module.scss';
import httpClient from '@/src/apis/httpClient';
import useClickOutside from '@/src/hooks/useClickOutside';
import { headerHttp } from '@/src/apis/dashboard';
import { UserInfo } from '@/src/types/dashboard';
import { getRandomcolorForPrefix } from '@/src/utils/makeRandomColor';

type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
};

interface AssigneeDropdownProps {
  dashboardId: number;
  onNicknameSelect: (nickname: string, userId: number) => void;
}

const AssigneeDropdown = ({ onNicknameSelect = () => {}, dashboardId }: AssigneeDropdownProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNickname, setSelectedNickname] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const dropdownRef = useRef(null);
  //console.log(typeof onNicknameSelect);

  let myProfileText = '';
  if (userInfo) {
    myProfileText = userInfo?.profileImageUrl ? '' : userInfo?.nickname.substring(0, 1);
  }

  const { color, backgroundColor } = getRandomcolorForPrefix(myProfileText);

  const loadUserInfo = async () => {
    const response = await headerHttp.getUserInfo();
    setUserInfo(response);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await httpClient.get(`/members?page=1&size=20&dashboardId=${dashboardId}`);
        const users = response.data.members;
        setFilteredUsers(users);
      } catch (error) {
        console.error('담당자 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    loadUserInfo();
  }, [userInfo?.profileImageUrl]);

  useClickOutside(dropdownRef, setIsOpen);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSelectedNickname(searchText);
    setFilteredUsers(filteredUsers.filter(user => user.nickname.toLowerCase().includes(searchText.toLowerCase())));
    setIsOpen(true);
  };

  const handleSelectNickname = (nickname: string, userId: number) => {
    setSelectedNickname(nickname);
    setIsOpen(false);
    onNicknameSelect(nickname, userId);
  };

  return (
    <div className={styles.dropDownContainer} ref={dropdownRef}>
      <label className={styles.label}>담당자</label>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={selectedNickname}
          onChange={handleInputChange}
          onClick={() => setIsOpen(!isOpen)}
          placeholder="이름을 입력해주세요"
          className={styles.input}
        />
        {isOpen && (
          <ul className={styles.ulContainer}>
            {filteredUsers.map(user => (
              <li
                key={user.id}
                className={styles.liContainer}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'lavender')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                onClick={() => handleSelectNickname(user.nickname, user.userId)}>
                {user?.profileImageUrl ? (
                  <Image
                    width={24}
                    height={24}
                    src={user.profileImageUrl}
                    alt="프로필"
                    className={styles.profileImage}
                  />
                ) : (
                  <div
                    className={styles.myProfile}
                    style={{ backgroundColor: getRandomcolorForPrefix(user.nickname.substring(0, 1)).color }}>
                    {user.nickname.substring(0, 1)}
                  </div>
                )}
                {user.nickname}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AssigneeDropdown;
