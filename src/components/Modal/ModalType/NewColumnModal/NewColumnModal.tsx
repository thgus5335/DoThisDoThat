import styles from './NewColumnModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';
import NormalInput from '../../ModalInput/NormalInput/NormalInput';

//에러 시 테두리 빨간색으로 변하는 로직은 모달 연결 시 더 고민할 예정
const NewColumnModal = () => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalName}>새 컬럼 생성</div>
      <NormalInput inputName="이름" placeholder="새 컬럼 이름을 입력하세요" />
      <div className={styles.modalButton}>
        <ModalButton size={'large'} color={'violet'}>
          생성
        </ModalButton>
      </div>
    </div>
  );
};

export default NewColumnModal;
