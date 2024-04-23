import { ChangeEvent } from 'react';
import styles from './TitleInput.module.scss';

interface TitleInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <div className={styles.titleContainer}>
      <label className={styles.label}>
        제목 <span className={styles.star}>*</span>
      </label>
      <input
        className={styles.titleInput}
        type="text"
        placeholder="제목을 입력해주세요"
        value={value}
        onChange={onChange}></input>
    </div>
  );
};

export default TitleInput;
