import { ReactNode } from 'react';
import styles from './TaskButton.module.scss';

interface TaskButtonProps {
  children: ReactNode;
  size: 'large' | 'medium' | 'long' | 'small';
  color: 'violet' | 'white';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskButton = ({ children, size, color, onClick }: TaskButtonProps) => {
  return (
    <button className={`${styles[size]} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default TaskButton;
