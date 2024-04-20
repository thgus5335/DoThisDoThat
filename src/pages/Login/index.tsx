import styles from './Login.module.scss';
import Input from '@/src/components/common/Input';
import BaseButton from '@/src/components/common/Button/BaseButton';
import React, { useState, useEffect } from 'react';
import { login } from '@/src/apis/authService';
import { saveTokenToLocalStorage } from '@/src/utils/authUtils';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const checkFormValidity = (formErrors: any, formData: any) => {
    const allFieldsFilled = Object.values(formData).every(x => x);
    const allErrorsResolved = Object.values(formErrors).every(x => !x);
    setIsSubmitEnabled(allErrorsResolved && allFieldsFilled);
  };

  useEffect(() => {
    checkFormValidity(formErrors, formData);
  }, [formData, formErrors]);

  const setFormError = (name: 'email' | 'password', newError: string) => {
    setFormErrors(prevErrors => {
      // 이전 에러와 새 에러가 다르면 업데이트
      if (prevErrors[name] !== newError) {
        return { ...prevErrors, [name]: newError };
      }
      // 변경이 없으면 이전 상태 반환
      return prevErrors;
    });
  };

  const validateEmail = (value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return '이메일을 입력해주세요.';
    if (!emailRegex.test(value)) {
      return '이메일 형식으로 작성해 주세요.';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호를 입력해 주세요.';
    if (value.length < 8) return '8자 이상 입력해 주세요.';
    return '';
  };

  // const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (!isSubmitEnabled) return;
  //   try {
  //     const data = await login(formData);
  //     console.log('Login successful', data);
  //     saveTokenToLocalStorage(data.accessToken);
  //     window.location.href = '/Mydashboard';
  //   } catch (error: unknown) {
  //     const e = error as Error;
  //     alert(e.message);
  //   }
  // };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSubmitEnabled) return;
    try {
      const data = await login(formData);
      console.log('로그인 성공', data);
      saveTokenToLocalStorage(data.accessToken);
      window.location.href = '/Mydashboard';
    } catch (error: unknown) {
      const e = error as Error;
      alert(e.message);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFormSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>); // 직접적인 제출 함수 호출을 피함
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  const goToSignUp = () => {
    window.location.href = '/SignUp';
  };

  return (
    <>
      <div className={styles.bigContainer}>
        <div className={styles.logoContainer}>
          <img src="./Logo.svg" alt="로고그림" className={styles.logoImage} onClick={goToHome} />
          <img src="./Taskify.svg" alt="로고명" className={styles.logoName} onClick={goToHome} />
        </div>
        <div className={styles.welcomeMessage}>오늘도 만나서 반가워요!</div>
        <form className={styles.inputContainer} onSubmit={handleFormSubmit}>
          <div className={styles.title}>이메일</div>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해 주세요"
            value={formData.email}
            onChange={handleChange}
            validate={validateEmail}
            setFormError={setFormError}
          />
          <div className={styles.title}>비밀번호</div>
          <Input
            type="password"
            name="password"
            placeholder="8자 이상 입력해 주세요"
            value={formData.password}
            onChange={handleChange}
            validate={validatePassword}
            setFormError={setFormError}
          />
          <BaseButton size="large" isDisabled={!isSubmitEnabled} onClick={handleButtonClick}>
            로그인
          </BaseButton>
          <div className={styles.goToLogin}>
            <div className={styles.question}>
              회원이 아니신가요?
              <span className={styles.goToLoginPage} onClick={goToSignUp}>
                회원가입하기
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
