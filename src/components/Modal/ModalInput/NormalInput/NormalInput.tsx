import { ChangeEvent } from 'react';
import styles from './NormalInput.module.scss';

interface NormalInputProps {
  inputName: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isExist?: boolean;
}

const NormalInput = ({ inputName, placeholder, value, onChange, isExist }: NormalInputProps) => {
  return (
    <div className={styles.normalContainer}>
      <label className={styles.label}>{inputName}</label>
      <input
        className={isExist ? styles.errorInput : styles.normalInput}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}></input>
    </div>
  );
};

export default NormalInput;
