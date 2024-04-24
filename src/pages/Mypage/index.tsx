import Image from 'next/image';
import styles from './Mypage.module.scss';
import backIcon from '@/src/assets/icons/leftArrowIcon.svg';
import { useRouter } from 'next/router';
import TaskButton from '@/src/components/common/Button/TaskButton';
import addIcon from '@/src/assets/icons/addIcon.svg';
import { useEffect, useState, ChangeEvent } from 'react';
import httpClient from '@/src/apis/httpClient';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const router = useRouter();

  const handleUserInfoChange = () => {
    const modifiedUserInfo = {
      nickname: nickname,
      profileImageUrl: profileImage,
    };
    console.log(modifiedUserInfo);

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
      const { nickname, profileImageUrl } = response.data;
      // setProfileInfo({ nickname, profileImageUrl });
      // console.log(profileInfo);
      setUserInfo(response.data);
      setProfileImage(response.data.profileImageUrl);
      return response.data; // 서버에서 반환한 유저 정보를 반환
    } catch (error) {
      console.error('유저 정보를 가져오는 중 오류 발생:', error);
      throw error; // 오류를 호출자에게 전파
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

  return (
    <>
      <div className={styles.container}>
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
                <input className={styles.passwordChangeInput} placeholder="현재 비밀번호 입력" />
              </div>
              <div className={styles.labelAndInput}>
                <label className={styles.inputLabel}>새 비밀번호</label>
                <input className={styles.passwordChangeInput} placeholder="새 비밀번호 입력" />
              </div>
              <div className={styles.labelAndInput}>
                <label className={styles.inputLabel}>새 비밀번호 확인</label>
                <input className={styles.passwordChangeInput} placeholder="새 비밀번호 확인" />
              </div>
            </div>
            <div className={styles.taskBtn}>
              <TaskButton size={'large'} color={'violet'}>
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
