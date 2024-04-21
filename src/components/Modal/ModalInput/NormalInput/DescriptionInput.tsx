import { ChangeEvent } from 'react';
import styles from './DescriptionInput.module.scss';

interface DescriptionInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  return (
    <div className={styles.descContainer}>
      <label className={styles.label}>
        설명 <span className={styles.star}>*</span>
      </label>
      <textarea
        className={styles.descInput}
        placeholder="설명을 입력해주세요"
        value={value}
        onChange={onChange}></textarea>
    </div>
  );
};

export default DescriptionInput;
