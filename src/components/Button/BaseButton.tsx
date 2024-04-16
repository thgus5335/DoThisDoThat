import styles from './BaseButton.module.scss';

interface ButtonProps {
  children: string;
  size?: string;
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BaseButton = ({ children, size = 'large', isDisabled, onClick }: ButtonProps) => {
  return (
    <>
      <button className={styles[size]} disabled={isDisabled} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default BaseButton;
