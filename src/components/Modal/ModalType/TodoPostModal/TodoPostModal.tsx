import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { format } from 'date-fns';
import httpClient from '@/src/apis/httpClient';
import styles from './TodoPostModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';
import AssigneeDropdown from '../../ModalInput/Dropdown/AssigneeDropdown/AssigneeDropdown';
import TitleInput from '../../ModalInput/NormalInput/TitleInput';
import DescriptionInput from '../../ModalInput/NormalInput/DescriptionInput';
import DateInput from '../../ModalInput/DateInput/DateInput';
import TagInput from '../../ModalInput/TagInput/TagInput';
import ImageInput from '../../ModalInput/ImageInput/ImageInput';
import TagChip from '../../ModalInput/TagInput/TagChip';
import router from 'next/router';

//4-16/cards로 post 요청 보내는 모달
/*request body 형태 예시 {
  "assigneeUserId": 0,
  "dashboardId": 0,
  "columnId": 0,
  "title": "string",
  "description": "string",
  "dueDate": "string",
  "tags": [
    "string"
  ],
  "imageUrl": "string"
}*/

//props로 dashboardID, columnID 받아야함
const TodoPostModal = ({ dashboardId, columnId, onClose }: any) => {
  const [selectedNickname, setSelectedNickname] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagName, setTagName] = useState('');
  const [image, setImage] = useState<string>('');

  // AssigneeDropdown에서 선택된 닉네임을 업데이트하는 함수
  const handleNicknameChange = (nickname: string, userId: number) => {
    setSelectedNickname(nickname);
    setSelectedUserId(userId);
  };

  //제목 입력값 업데이트 함수
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //설명 입력값 업데이트 함수
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  //날짜 선택 시, 선택된 날짜를 업데이트하는 함수
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  //서버로 전송할 때, 날짜 형식 변환 함수
  const formatDate = (date: Date | null) => {
    return date ? format(date, 'yyyy-MM-dd HH:mm') : '';
  };

  //태그 입력값 업데이트 함수
  const handleTagName = (e: ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  //태그 생성 함수
  const createTags = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagName.trim();
      if (newTag) {
        setTags(prevTags => [...prevTags, newTag]);
        setTagName('');
      }
    }
  };

  //이미지 선택 시, 선택된 이미지를 처리하는 함수
  const handleImageSelected = (file: File) => {
    //이미지 서버로 전송하는 로직
    const formData = new FormData();
    formData.append('image', file);

    httpClient
      .post(`/columns/${columnId}/card-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setImage(response.data.imageUrl);
        console.log('이미지 업로드 성공:', response.data.imageUrl);
      })
      .catch(error => {
        console.error('이미지 업로드 오류:', error);
      });
  };

  //할 일 생성 버튼 클릭 시, 할 일 생성 요청을 보내는 함수
  const handleSubmit = async (e: any) => {
    e.preventDefault(); //전체 폼 제출 시, 엔터키 눌렀을때 제출 방지
    //서버로 전송
    await httpClient
      .post('/cards', {
        assigneeUserId: selectedUserId,
        dashboardId: dashboardId,
        columnId: columnId,
        title: title,
        description: description,
        dueDate: formatDate(selectedDate),
        tags: tags,
        imageUrl: image,
      })
      .then(response => {
        console.log('할 일 생성 성공:', response.data);
        onClose();
        router.reload();
      })
      .catch(error => {
        console.error('할 일 생성 오류:', error);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>할 일 생성</div>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <AssigneeDropdown onNicknameSelect={handleNicknameChange} dashboardId={dashboardId} />
        <TitleInput value={title} onChange={handleTitle} />
        <DescriptionInput value={description} onChange={handleDescription} />
        <DateInput onDateSelect={handleDateChange} />
        <div className={styles.tagContainer}>
          <TagInput value={tagName} onChange={handleTagName} onKeyDown={createTags} />
          <div className={styles.tagList}>
            {tags.map((name, index) => (
              <TagChip key={index} name={name} /> //태그 위치 수정 필요
            ))}
          </div>
        </div>
        <ImageInput onImageChange={handleImageSelected} />
        <div className={styles.submitButton}>
          <ModalButton type="submit" size={'large'} color={'violet'}>
            생성
          </ModalButton>
        </div>
      </form>
    </div>
  );
};

export default TodoPostModal;
