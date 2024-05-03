import styles from './DeleteAlertModal.module.scss';
import ModalButton from '../../ModalButton/ModalButton';

interface DeleteAlertModalProps {
  onDeleteColumn: () => void;
}

const DeleteAlertModal = ({ onDeleteColumn }: DeleteAlertModalProps) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.deleteText}>칼럼의 모든 카드가 삭제됩니다.</div>
      <div className={styles.modalButton}>
        <ModalButton size={'large'} color={'violet'} onClick={onDeleteColumn}>
          삭제
        </ModalButton>
      </div>
    </div>
  );
};

export default DeleteAlertModal;
