import CommentSubmitButton from '@/src/components/Modal/ModalButton/CommentButton/CommentSubmitButton';
import ModalButton from '@/src/components/Modal/ModalButton/ModalButton';
import DateInput from '@/src/components/Modal/ModalInput/DateInput/DateInput';
import AssigneeDropdown from '@/src/components/Modal/ModalInput/Dropdown/AssigneeDropdown/AssigneeDropdown';
import ColumnDropdown from '@/src/components/Modal/ModalInput/Dropdown/ColumnDropdown/ColumnDropdown';
import ImageInput from '@/src/components/Modal/ModalInput/ImageInput/ImageInput';
import TagInput from '@/src/components/Modal/ModalInput/TagInput/TagInput';
import Modal from '@/src/components/Modal/Modal';
import useModal from '@/src/hooks/useModal';
import styles from '@/src/pages/modalTest/modalTest.module.scss';

export default function ModalTestPage() {
  const { modalState, openModal, closeModal } = useModal();
  const handleImageSelected = (file: File) => {
    console.log('Selected image:', file);
    //추후 서버로 업로드하는 로직 추가 예정
  };
  return (
    <div className={styles.container}>
      {/*<ModalButton size={'large'} color={'violet'}>
        확인
      </ModalButton>
      <ModalButton size={'small'} color={'violet'}>
        확인
      </ModalButton>
      <ModalButton size={'large'} color={'white'}>
        취소
      </ModalButton>
      <ModalButton size={'small'} color={'white'}>
        취소
      </ModalButton>
      <CommentSubmitButton size={'large'}>입력</CommentSubmitButton>
  <CommentSubmitButton size={'small'}>입력</CommentSubmitButton>*/}
      <AssigneeDropdown />
      <ColumnDropdown />
      <ImageInput onImageChange={handleImageSelected} />
      <TagInput />
      <DateInput />
      <button onClick={openModal}>Open Modal</button>
      {modalState && (
        <Modal isOpen={modalState} onClose={closeModal}>
          모달 테스트
        </Modal>
      )}
    </div>
  );
}
