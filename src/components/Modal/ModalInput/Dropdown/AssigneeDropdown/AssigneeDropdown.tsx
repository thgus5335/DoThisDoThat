import { useState, useEffect, ChangeEvent } from 'react';

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

//더미 데이터 (api 연동 시 수정할 예정)
const users: User[] = [
  {
    id: 8064,
    email: 'test123@codeit123.com',
    nickname: '테스트중 일이삼',
    profileImageUrl: null,
    createdAt: '2024-04-16T15:19:35.258Z',
    updatedAt: '2024-04-16T16:09:03.090Z',
    isOwner: true,
    userId: 1651,
  },
  {
    id: 8072,
    email: 'linason7889@gmail.com',
    nickname: '승이버섯',
    profileImageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/1-7_1657_1713444915949.jpeg',
    createdAt: '2024-04-16T16:13:21.653Z',
    updatedAt: '2024-04-18T21:55:16.117Z',
    isOwner: false,
    userId: 1657,
  },
];

const AssigneeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNickname, setSelectedNickname] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSelectedNickname(searchText);
    setFilteredUsers(users.filter(user => user.nickname.toLowerCase().includes(searchText.toLowerCase())));
    setIsOpen(true);
  };

  const handleSelectNickname = (nickname: string) => {
    setSelectedNickname(nickname);
    setIsOpen(false);
  };

  return (
    <div>
      <label>담당자</label>
      <input
        type="text"
        value={selectedNickname}
        onChange={handleInputChange}
        onClick={() => setIsOpen(!isOpen)}
        placeholder="이름을 입력해주세요"
      />
      {isOpen && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredUsers.map(user => (
            <li
              key={user.id}
              style={{ padding: '10px', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'lavender')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
              onClick={() => handleSelectNickname(user.nickname)}>
              {user.nickname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssigneeDropdown;
