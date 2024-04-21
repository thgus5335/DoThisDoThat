import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './SingleButtonModal.module.scss';
import ModalButton from './ModalButton/ModalButton';

interface SingleButtonModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
}

const SingleButtonModal = ({ children, isOpen, onClose }: SingleButtonModalProps) => {
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

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        {children}
        <div className={styles.okButton}>
          <ModalButton size={'large'} color={'violet'} onClick={onClose}>
            확인
          </ModalButton>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default SingleButtonModal;
