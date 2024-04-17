import styles from './BaseButton.module.scss';

interface BaseButtonProps {
  children: string;
  size: 'large' | 'medium';
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BaseButton = ({ children, size, isDisabled, onClick }: BaseButtonProps) => {
  return (
    <button className={styles[size]} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default BaseButton;
