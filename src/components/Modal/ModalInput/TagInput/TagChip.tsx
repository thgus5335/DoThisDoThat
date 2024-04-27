import styles from './TagChip.module.scss';

interface tagChipProps {
  name: string;
  onClick?: () => void;
}

// 랜덤 색상 생성 함수
const randomColor = () => {
  const baseColor = Math.floor(Math.random() * 360);
  const color = `hsl(${baseColor}, 70%, 40%)`; // 밝은 색상
  const backgroundColor = `hsl(${baseColor}, 70%, 90%)`; // 어두운 배경
  return { color, backgroundColor };
};

const TagChip = ({ name, onClick }: tagChipProps) => {
  const { color, backgroundColor } = randomColor();

  return (
    <div style={{ color: color, backgroundColor: backgroundColor }} className={styles.tagChip} onClick={onClick}>
      {name}
    </div>
  );
};

export default TagChip;
