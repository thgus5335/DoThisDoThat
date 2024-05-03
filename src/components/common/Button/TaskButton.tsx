import { ReactNode } from 'react';
import styles from './TaskButton.module.scss';

interface TaskButtonProps {
  children: ReactNode;
  size: 'large' | 'medium' | 'long' | 'small';
  color: 'violet' | 'white';
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskButton = ({ children, size, color, isDisabled, onClick }: TaskButtonProps) => {
  return (
    <button className={`${styles[size]} ${styles[color]}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default TaskButton;
