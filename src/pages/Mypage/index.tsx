import { useEffect, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import httpClient from '@/src/apis/httpClient';
import SingleButtonModal from '@/src/components/Modal/SingleButtonModal';
import TaskButton from '@/src/components/common/Button/TaskButton';
import addIcon from '@/src/assets/icons/addIcon.svg';
import backIcon from '@/src/assets/icons/leftArrowIcon.svg';
import styles from './Mypage.module.scss';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  const router = useRouter();

  const handleUserInfoChange = () => {
    const modifiedUserInfo = {
      nickname: nickname,
      profileImageUrl: profileImage,
    };

    httpClient
      .put('/users/me', modifiedUserInfo)
      .then(response => {
        console.log('사용자 정보 수정 성공:', response.data);
        setUpdateTrigger(prevState => !prevState);
        setNickname('');
      })
      .catch(error => {
        console.error('사용자 정보 수정 오류:', error);
      });
  };

  const handleImageChangeTest = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('image', file);

      httpClient
        .post('/users/me/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('이미지 업로드 성공:', response.data);
          setProfileImage(response.data.profileImageUrl);
        })
        .catch(error => {
          console.error('이미지 업로드 오류:', error);
        });
    }
  };

  async function getUserInfo() {
    try {
      const response = await httpClient.get('/users/me');
      setUserInfo(response.data);
      setProfileImage(response.data.profileImageUrl);
      return response.data;
    } catch (error) {
      console.error('유저 정보를 가져오는 중 오류 발생:', error);
      throw error;
    }
  }

  useEffect(() => {
    getUserInfo()
      .then(userInfo => {
        console.log('유저 정보:', userInfo);
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 오류 발생:', error);
      });
  }, [updateTrigger]);

  // 비밀번호
  const handlePasswordInfoChange = () => {
    const modifiedPasswordInfo = {
      password: password,
      newPassword: newPassword,
    };

    httpClient
      .put('/auth/password', modifiedPasswordInfo)
      .then(response => {
        console.log('사용자 정보 수정 성공:', response.data);
        setUpdateTrigger(prevState => !prevState);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch(error => {
        console.error('사용자 정보 수정 오류:', error);
        setModalErrorMessage(error.response.data.message);
        setModalOpen(true);
      });
  };

  const handleConfirmPasswordBlur = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    if (
      password.length >= 8 &&
      newPassword.length >= 8 &&
      confirmPassword.length >= 8 &&
      newPassword === confirmPassword
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [password, newPassword, confirmPassword]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        {modalOpen && (
          <div>
            <SingleButtonModal isOpen onClose={handleModalClose}>
              {modalErrorMessage}
            </SingleButtonModal>
          </div>
        )}
        <div className={styles.menu}></div>
        <div className={styles.navbar}></div>
        <div className={styles.mypageContent}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <Image src={backIcon} alt="돌아가기" />
            <p>돌아가기</p>
          </button>
          <section className={styles.profile}>
            <h3 className={styles.title}>프로필</h3>
            <div className={styles.profileContent}>
              <div className={styles.imageUpload}>
                <label htmlFor="imageInputField" className={styles.imageInputButton}>
                  <Image
                    className={styles.imagePreview}
                    src={profileImage ? profileImage : addIcon}
                    layout="responsive"
                    width={30}
                    height={30}
                    // fill
                    alt="추가한 이미지"
                  />
                </label>
                <input
                  id="imageInputField"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeTest}
                  className={styles.imageInputField}
                />
              </div>
              <div className={styles.profileInputBox}>
                <div className={styles.labelAndInput}>
                  <label className={styles.inputLabel}>이메일</label>
                  <input className={styles.profileInput} value={userInfo.email} disabled />
                </div>
                <div className={styles.labelAndInput}>
                  <label className={styles.inputLabel}>닉네임</label>
                  <input
                    className={styles.profileInput}
                    placeholder={userInfo.nickname}
                    value={nickname}
                    maxLength={10}
                    onChange={e => setNickname(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.taskBtn}>
              <TaskButton size={'large'} color={'violet'} onClick={handleUserInfoChange}>
                저장
              </TaskButton>
            </div>
          </section>
          <section className={styles.passwordChange}>
            <h3 className={styles.title}>비밀번호 변경</h3>
            <div className={styles.passwordChangeContent}>
              <div className={styles.labelAndInput}>
                <label className={styles.inputLabel}>현재 비밀번호</label>
                <input
                  className={styles.passwordChangeInput}
                  type="password"
                  placeholder="현재 비밀번호 입력"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.labelAndInput}>
                <label className={styles.inputLabel}>새 비밀번호</label>
                <input
                  className={styles.passwordChangeInput}
                  type="password"
                  placeholder="새 비밀번호 입력"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
              <div className={styles.labelAndInput}>
                <label className={`${passwordError && styles.isError} ${styles.inputLabel}`}>새 비밀번호 확인</label>
                <input
                  className={styles.passwordChangeInput}
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                />
                {passwordError.length > 0 && <p>{passwordError}</p>}
              </div>
            </div>
            <div className={styles.taskBtn}>
              <TaskButton
                size={'large'}
                color={'violet'}
                onClick={handlePasswordInfoChange}
                isDisabled={!isButtonEnabled}>
                변경
              </TaskButton>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Mypage;
