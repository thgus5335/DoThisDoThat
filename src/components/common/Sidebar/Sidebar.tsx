import Image from 'next/image';
import styles from './Sidebar.module.scss';

import iconlogo from '@/public/Logo.png';
import icontitle from '@/public/Title.png';
import iconAdd from '@/src/assets/icons/addBox.svg';
import iconCrown from '@/src/assets/icons/crownIcon.svg';
import { useEffect, useState } from 'react';
import { Dashboards } from '@/src/types/dashboard';
import { sidebarHttp } from '@/src/apis/dashboard';
import router from 'next/router';
import useModal from '@/src/hooks/useModal';
import DoubleButtonModal from '../../Modal/DoubleButtonModal';
import NewDashboardModal from '../../Modal/ModalType/NewDashboardModal/NewDashboardModal';

const Sidebar = () => {
  const { modalState, openModal, closeModal } = useModal();
  const [dashboardList, setDashboardList] = useState<Dashboards[]>([]);

  const loadDashboardList = async () => {
    const response = await sidebarHttp.getDashboardList(1, 10);
    setDashboardList(response.dashboards);
  };

  useEffect(() => {
    loadDashboardList();
  }, [modalState]);

  return (
    <>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewDashboardModal onClose={closeModal} />
        </DoubleButtonModal>
      )}
      <div className={styles.sidebar}>
        <div className={styles.logoTitle} onClick={() => router.push('/Mydashboard')}>
          <Image className={styles.logo} src={iconlogo} alt="로고." />
          <Image className={styles.title} src={icontitle} priority alt="일해라절해라." />
        </div>
        <div className={styles.sidebarTitle}>
          <p className={styles.titleName}>Dash Boards</p>
          <Image src={iconAdd} onClick={() => openModal()} alt="대시보드 생성하기." />
        </div>
        <ul className={styles.dashboardList}>
          {dashboardList &&
            dashboardList.map(dashboard => (
              <li key={dashboard.id} onClick={() => router.replace({ pathname: `/Dashboard/${dashboard.id}` })}>
                <div className={styles.dashboard}>
                  <div className={styles.color} style={{ backgroundColor: `${dashboard.color}` }} />
                  <div className={styles.name}>{dashboard.title}</div>
                </div>
                {dashboard.createdByMe ? (
                  <Image className={styles.iconCrown} src={iconCrown} alt={`내가 만든 대시보드.`} />
                ) : (
                  <div className={styles.noneIconCrown}></div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
