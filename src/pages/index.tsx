import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import MainHeader from '../components/common/Header/MainHeader';
import BaseButton from '../components/common/Button/BaseButton';
import Footer from '../components/common/Footer/Footer';
import { MAIN_ARTICLE_LIST, SUB_ARTICLE_LIST } from '../constants/constant';
import { getTokenFromLocalStorage } from '../utils/authUtils';
import coverImage from '@/src/assets/images/coverImage.png';
import styles from './index.module.scss';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = getTokenFromLocalStorage();

    if (accessToken) {
      router.push('/Mydashboard');
    }
  }, []);

  return (
    <>
      <MainHeader />
      <div className={styles.homePageLayout}>
        <section className={styles.mainSection}>
          <Image className={styles.coverImg} src={coverImage} alt="대표 이미지" />
          <Link href={'/Login'}>
            <BaseButton size={'medium'}>로그인하기</BaseButton>
          </Link>
        </section>
        <section className={styles.mainArticleSection}>
          {MAIN_ARTICLE_LIST.map(({ id, description, image, width, height }) => (
            <article key={id} className={styles.mainArticleBox}>
              <div className={styles.mainArticleTextBox}>
                <p className={styles.point}>Point {id}</p>
                <h2 className={styles.mainArticleDescription}>{description}</h2>
              </div>
              <div className={styles.mainArticleImg}>
                <Image
                  src={image}
                  alt="일해라 절해라 메인 소개 이미지"
                  width={width}
                  height={height}
                  layout="intrinsic"
                />
              </div>
            </article>
          ))}
        </section>
        <section className={styles.subArticleSection}>
          <h3 className={styles.subArticleMainTitle}>생산성을 높이는 다양한 설정 ⚡</h3>
          <div className={styles.subArticle}>
            {SUB_ARTICLE_LIST.map(({ title, description, image, width, height }) => (
              <article key={title}>
                <div className={styles.subArticleImgBox}>
                  <div>
                    <Image src={image} alt="일해라 절해라 서브 소개 이미지" width={width} height={height} />
                  </div>
                </div>
                <div className={styles.subDescriptionBox}>
                  <p className={styles.subArticleTitle}>{title}</p>
                  <p className={styles.subArticleDescription}>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
