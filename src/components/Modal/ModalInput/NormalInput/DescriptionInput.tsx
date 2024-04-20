import { ChangeEvent } from 'react';
import styles from './DescriptionInput.module.scss';

interface DescriptionInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionInput = ({ value, onChange }: DescriptionInputProps) => {
  return (
    <>
      <label>
        설명 <span>*</span>
      </label>
      <textarea
        className={styles.input}
        placeholder="설명을 입력해주세요."
        value={value}
        onChange={onChange}></textarea>
    </>
  );
};

export default DescriptionInput;
