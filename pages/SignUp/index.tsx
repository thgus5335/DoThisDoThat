import Input from '@/src/components/common/Input';
import styles from './SignUp.module.scss';
import React, { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateNickname = (value: string) => {
    if (!value) return '닉네임을 입력해주세요';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호를 입력해 주세요.';
    if (value.length < 8) return '8자 이상 입력해 주세요.';
    if (value !== formData.confirmPassword) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return '비밀번호를 입력해 주세요.';
    if (value !== formData.password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  return (
    <>
      <div>첫 방문을 환영합니다!</div>
      <div className={styles.inputContainer}>
        <div>이메일</div>
        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          value={formData.email}
          onChange={handleChange}
          validate={value => (value ? '' : '이메일 형식으로 작성해 주세요.')}
        />
        <div>닉네임</div>
        <Input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          value={formData.nickname}
          onChange={handleChange}
          validate={validateNickname}
        />
      </div>
    </>
  );
}
