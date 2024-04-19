import { useState, useEffect, KeyboardEvent } from 'react';

type Tag = {
  text: string;
  color: string;
  backgroundColor: string;
};

const demoData = {
  id: 4990,
  title: '테스트를 하러 왔다 애송이',
  description: '음 이런거구만 날짜는 라이브러리를 써봐야겟구만',
  tags: ['오잉', '우왕', '신기', '뭐야왜랜덤아님', '색깔', '뭐야', '흠'],
  dueDate: '2024-04-21 21:30',
  assignee: {
    id: 1657,
    nickname: '승이버섯',
    profileImageUrl:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/profile_image/1-7_1657_1713444915949.jpeg',
  },
  imageUrl: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/1-7_20334_1713444567947.jpeg',
  teamId: '1-7',
  columnId: 20334,
  dashboardId: 5911,
  createdAt: '2024-04-18T21:49:28.311Z',
  updatedAt: '2024-04-18T21:50:00.307Z',
};

// 랜덤 색상 생성 함수
const randomColor = () => {
  const baseColor = Math.floor(Math.random() * 360);
  const color = `hsl(${baseColor}, 70%, 40%)`; // 밝은 색상
  const backgroundColor = `hsl(${baseColor}, 70%, 90%)`; // 어두운 배경
  return { color, backgroundColor };
};

// 태그 입력 컴포넌트
export default function TagInput() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [input, setInput] = useState('');
  const { color, backgroundColor } = randomColor();

  // 서버로부터 태그 데이터를 로드
  useEffect(() => {
    const fetchData = async () => {
      const loadedTags = demoData.tags.map((tagText: string) => ({
        text: tagText,
        color: color,
        backgroundColor: backgroundColor,
      }));
      setTags(loadedTags);
    };

    fetchData();
  }, []);

  // 태그 입력 처리
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input.trim()) {
      const newTag: Tag = {
        text: input,
        color: color,
        backgroundColor: backgroundColor,
      };
      setTags(prevTags => [...prevTags, newTag]);
      setInput('');
    }
  };

  // 입력 값 변경 처리
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="입력 후 Enter"
        style={{ border: '1px solid black' }}
      />
      {tags.map((tag, index) => (
        <span
          key={index}
          style={{
            color: tag.color,
            backgroundColor: tag.backgroundColor,
            margin: '5px',
            padding: '5px',
            display: 'inline-block',
            zIndex: 10,
          }}>
          {tag.text}
        </span>
      ))}
    </div>
  );
}
