import { ReactNode, MouseEvent } from 'react';
import styles from './CommentSubmitButton.module.scss';

interface CommentSubmitButtonProps {
  children: ReactNode;
  size: 'large' | 'small';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CommentSubmitButton = ({ children, size, onClick }: CommentSubmitButtonProps) => {
  return (
    <button type="submit" className={`${styles[size]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default CommentSubmitButton;
