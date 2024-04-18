import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputProps<T extends string> {
  type: string; // 입력 필드의 종류 (nickname, password ...etc)
  name: T; // 입력 필드의 이름
  placeholder: string; // placeholder
  value: string; // 입력 필드의 현재 값
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 입력 필드의 값이 변경될 때마다 실행
  validate: (value: string) => string; // 입력 값의 유효성 검사, 유효하지 않을 경우 에러 메시지 반환
  setFormError: (name: T, error: string) => void; // 유효성 검사 에러를 SignUp에 전달
}

export default function Input<T extends string>({
  type,
  name,
  placeholder,
  value,
  onChange,
  validate,
  setFormError,
}: InputProps<T>) {
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormError(name, error);
  }, [error, name, setFormError]);

  // 유효성 검사
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(e); // 상위 컴포넌트의 상태 업데이트
    const validationError = validate(value);
    setError(validationError);
    setFormError(name, validationError);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type={showPassword ? 'text' : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={error ? styles.errorInput : styles.input}
      />
      {type === 'password' && (
        <button onClick={togglePasswordVisibility} className={styles.toggleButton}>
          {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </button>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
