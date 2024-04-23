import { ReactNode } from 'react';
import styles from './TodoPostModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';
import AssigneeDropdown from '../../ModalInput/Dropdown/AssigneeDropdown/AssigneeDropdown';
import TitleInput from '../../ModalInput/NormalInput/TitleInput';
import DescriptionInput from '../../ModalInput/NormalInput/DescriptionInput';
import DateInput from '../../ModalInput/DateInput/DateInput';
import TagInput from '../../ModalInput/TagInput/TagInput';
import ImageInput from '../../ModalInput/ImageInput/ImageInput';

const TodoPostModal = () => {
  const handleImageSelected = (file: File) => {
    console.log('Selected image:', file);
    //추후 서버로 업로드하는 로직 추가 예정
  };

  //엔터키 눌렀을때 제출 방지
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //추후 서버 전송 로직 추가 예정
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>할 일 생성</div>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <AssigneeDropdown />
        <TitleInput />
        <DescriptionInput />
        <DateInput />
        <TagInput />
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
