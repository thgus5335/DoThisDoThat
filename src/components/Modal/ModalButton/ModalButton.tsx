import { ReactNode, MouseEvent } from 'react';
import styles from './ModalButton.module.scss';

interface ModalButtonProps {
  children: ReactNode;
  type?: string;
  size: 'large' | 'small';
  color: 'violet' | 'white';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ModalButton = ({ children, size, color, onClick }: ModalButtonProps) => {
  return (
    <button className={`${styles[size]} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default ModalButton;
