import Image from 'next/image';
import styles from './Sidebar.module.scss';

import iconlogo from '@/src/assets/icons/headerLogo.svg';
import icontitle from '@/src/assets/icons/headerTitle.svg';
import iconAdd from '@/src/assets/icons/addBox.svg';
import iconCrown from '@/src/assets/icons/crownIcon.svg';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoTitle}>
        <Image src={iconlogo} alt="로고." />
        <Image src={icontitle} alt="일해라절해라." />
      </div>
      <div className={styles.sidebarTitle}>
        <p>Dash Boards</p>
        <Image src={iconAdd} alt="대시보드 생성하기." />
      </div>
      <ul className={styles.dashboardList}>
        {/* map 돌릴 예정 ㅇ.< */}
        <li>
          <div className={styles.dashboard}>
            <div className={styles.color} />
            <div className={styles.name}>대시보드1</div>
          </div>
          <Image src={iconCrown} alt={`대시보드.`} />
        </li>
        <li>
          <div className={styles.dashboard}>
            <div className={styles.color} />
            <div className={styles.name}>대시보드2</div>
          </div>
          <Image src={iconCrown} alt={`대시보드.`} />
        </li>
        <li>
          <div className={styles.dashboard}>
            <div className={styles.color} />
            <div className={styles.name}>대시보드3</div>
          </div>
          <Image src={iconCrown} alt={`대시보드.`} />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
