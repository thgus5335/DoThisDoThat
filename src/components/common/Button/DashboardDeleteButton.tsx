import styles from './DashboardDeleteButton.module.scss';

interface DashboardDeleteButtonProps {
  size: 'large' | 'small';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const DashboardDeleteButton = ({ size, onClick }: DashboardDeleteButtonProps) => {
  return (
    <button className={styles[size]} onClick={onClick}>
      대시보드 삭제하기
    </button>
  );
};

export default DashboardDeleteButton;
