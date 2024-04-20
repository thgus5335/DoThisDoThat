import { ChangeEvent } from 'react';
import styles from './TitleInput.module.scss';

interface TitleInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TitleInput = ({ value, onChange }: TitleInputProps) => {
  return (
    <>
      <label>
        제목 <span>*</span>
      </label>
      <textarea className={styles.input} placeholder="제목을 입력해주세요" value={value} onChange={onChange}></textarea>
    </>
  );
};

export default TitleInput;
