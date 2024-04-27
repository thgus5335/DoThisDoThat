import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './NormalModal.module.scss';
import Image from 'next/image';
import closeX from '@/src/assets/icons/closeX.svg';

interface NormalModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
}

const NormalModal = ({ children, isOpen, onClose }: NormalModalProps) => {
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
        <button onClick={onClose}>
          <Image src={closeX} alt="close" width={20} height={20} className={styles.closeButton} />
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default NormalModal;
