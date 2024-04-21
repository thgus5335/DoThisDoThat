import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_SOCIAL_LIST } from '@/src/constants/constant';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>©dothisdothat - 2024</p>
      </div>
      <div className={styles.centerContent}>
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className={styles.social}>
        {FOOTER_SOCIAL_LIST.map(({ id, href, image }) => (
          <Link key={id} href={href} target="_blank">
            <Image src={image} alt={id} />
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
