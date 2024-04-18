import CommentSubmitButton from '@/src/components/Modal/ModalButton/CommentSubmitButton';
import ModalButton from '@/src/components/Modal/ModalButton/ModalButton';
import styles from '@/src/pages/modalTest/modalTest.module.scss';

export default function ModalTestPage() {
  return (
    <div className={styles.container}>
      <ModalButton size={'large'} color={'violet'}>
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
      <CommentSubmitButton size={'small'}>입력</CommentSubmitButton>
    </div>
  );
}
