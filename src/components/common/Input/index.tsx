import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type: string; // 입력 필드의 종류 (nickname, password ...etc)
  name: string; // 입력 필드의 이름
  placeholder: string; // placeholder
  value: string; // 입력 필드의 현재 값
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 입력 필드의 값이 변경될 때마다 실행
  validate: (value: string) => string; // 입력 값의 유효성 검사, 유효하지 않을 경우 에러 메시지 반환
  setFormError: (name: string, error: string) => void; // 유효성 검사 에러를 SignUp에 전달
}

export default function Input({ type, name, placeholder, value, onChange, validate, setFormError }: InputProps) {
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormError(name, error);
  }, [error, name, setFormError]);

  // 유효성 검사
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const validationError = validate(e.target.value);
    setError(validationError);
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
        onChange={onChange}
        onBlur={handleBlur}
        className={error ? styles.errorInput : styles.input}
      />
      {type === 'password' && (
        <button onClick={togglePasswordVisibility} className={styles.toggleButton}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
