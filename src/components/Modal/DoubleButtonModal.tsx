import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './DoubleButtonModal.module.scss';
import ModalButton from './ModalButton/ModalButton';

interface DoubleButtonModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
  size: 'large' | 'small';
}

const DoubleButtonModal = ({ children, isOpen, onClose, size }: DoubleButtonModalProps) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    function keyHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [onClose]);

  // 모달 배경 클릭 시 모달 닫기 로직
  function onBackgroundClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={onBackgroundClick}>
      <div className={`${styles[size]} ${styles.modalContainer}`} onClick={e => e.stopPropagation()}>
        {children}
        <div className={styles.cancelButton}>
          <ModalButton size={'large'} color={'white'} onClick={onClose}>
            취소
          </ModalButton>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default DoubleButtonModal;
