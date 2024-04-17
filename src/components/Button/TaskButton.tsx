import styles from './TaskButton.module.scss';

interface ButtonProps {
  children: string;
  size: string;
  color: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskButton = ({ children, size, color, onClick }: ButtonProps) => {
  return (
    <button className={`${styles[size]} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default TaskButton;
