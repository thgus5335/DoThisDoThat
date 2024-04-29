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

  // 모달 배경 클릭 시 모달 닫기 로직
  function onBackgroundClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalBackground} onClick={onBackgroundClick}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
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
