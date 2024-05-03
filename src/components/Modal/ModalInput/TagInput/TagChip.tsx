import styles from './TagChip.module.scss';
import { getRandomcolorForPrefix } from '@/src/utils/makeRandomColor';

interface tagChipProps {
  name: string;
  onClick?: () => void;
}

const TagChip = ({ name, onClick }: tagChipProps) => {
  const { color, backgroundColor } = getRandomcolorForPrefix(name.split('')[0]);

  return (
    <div style={{ color: color, backgroundColor: backgroundColor }} className={styles.tagChip} onClick={onClick}>
      {name}
    </div>
  );
};

export default TagChip;
