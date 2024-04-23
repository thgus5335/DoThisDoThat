import Image from 'next/image';
import styles from './Mypage.module.scss';
import backIcon from '@/src/assets/icons/leftArrowIcon.svg';
import { useRouter } from 'next/router';
import TaskButton from '@/src/components/common/Button/TaskButton';
import addIcon from '@/src/assets/icons/addIcon.svg';

const Mypage = () => {
  const router = useRouter();

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
              <button className={styles.imageUpload}>
                <Image src={addIcon} alt="이미지 업로드" width={30} height={30} />
              </button>
              <div className={styles.profileInputBox}>
                <div className={styles.labelAndInput}>
                  <label className={styles.inputLabel}>이메일</label>
                  <input className={styles.profileInput} />
                </div>
                <div className={styles.labelAndInput}>
                  <label className={styles.inputLabel}>닉네임</label>
                  <input className={styles.profileInput} />
                </div>
              </div>
            </div>
            <div className={styles.taskBtn}>
              <TaskButton size={'large'} color={'violet'}>
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
