import Input from '@/src/components/common/Input';
import styles from './SignUp.module.scss';
import React, { useState, useEffect, FormEvent } from 'react';
import { registerUser } from '@/src/apis/authService';

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [checkboxAgreed, setCheckboxAgreed] = useState(false); // 이용 약관 동의 여부
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const checkFormValidity = (checkboxAgreed: boolean, formErrors: FormErrors, formData: FormData) => {
    const allFieldsFilled = Object.values(formData).every(x => x);
    const allErrorsResolved = Object.values(formErrors).every(x => !x);
    setIsSubmitEnabled(allErrorsResolved && allFieldsFilled && checkboxAgreed);
  };

  const handleCheckboxChange = () => {
    setCheckboxAgreed(prev => {
      const newAgreed = !prev;
      checkFormValidity(newAgreed, formErrors, formData);
      return newAgreed;
    });
  };

  useEffect(() => {
    checkFormValidity(checkboxAgreed, formErrors, formData);
  }, [formData, formErrors, checkboxAgreed]);

  const setFormError = (name: 'email' | 'nickname' | 'password' | 'confirmPassword', newError: string) => {
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

  const validateNickname = (value: string) => {
    if (!value) return '닉네임을 입력해주세요.';
    if (value.length > 11) return '열 자 이하로 작성해주세요.';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호를 입력해 주세요.';
    if (value.length < 8) return '8자 이상 입력해 주세요.';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return '비밀번호를 입력해 주세요.';
    if (value.length < 8) return '8자 이상 입력해 주세요.';
    if (value !== formData.password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitEnabled) {
      // 서버에 데이터 전송 로직
      try {
        const result = await registerUser(formData);
        console.log('Registration successful:', result);
        alert('가입이 완료되었습니다');
        window.location.href = '/Login';
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  const goToLogin = () => {
    window.location.href = '/Login';
  };

  return (
    <>
      <div className={styles.bigContainer}>
        <div className={styles.logoContainer}>
          <img src="./Logo.svg" alt="로고그림" className={styles.logoImage} onClick={goToHome} />
          <img src="./Taskify.svg" alt="로고명" className={styles.logoName} onClick={goToHome} />
        </div>
        <div className={styles.welcomeMessage}>첫 방문을 환영합니다!</div>
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
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
          <div className={styles.title}>닉네임</div>
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해 주세요"
            value={formData.nickname}
            onChange={handleChange}
            validate={validateNickname}
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
          <div className={styles.title}>비밀번호 확인</div>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 한번 더 입력해 주세요"
            value={formData.confirmPassword}
            onChange={handleChange}
            validate={validateConfirmPassword}
            setFormError={setFormError}
          />
          <div className={styles.agreeContainer}>
            <input type="checkbox" className={styles.agreeCheck} onChange={() => setCheckboxAgreed(!checkboxAgreed)} />
            <div className={styles.agreeMessage}>이용약관에 동의합니다.</div>
          </div>
          <button className={`${isSubmitEnabled ? styles.buttonEnabled : styles.button}`} disabled={!isSubmitEnabled}>
            가입하기
          </button>
          <div className={styles.goToLogin}>
            <div className={styles.question}>
              이미 가입하셨나요?
              <span className={styles.goToLoginPage} onClick={goToLogin}>
                로그인하기
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
