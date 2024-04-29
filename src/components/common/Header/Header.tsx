import Image from 'next/legacy/image';
import styles from './Header.module.scss';
import iconCrown from '@/src/assets/icons/crownIcon.svg';
import iconAdd from '@/src/assets/icons/addBox.svg';
import iconSetting from '@/src/assets/icons/setting.svg';
import iconBackward from '@/src/assets/icons/arrowLeft.svg';

import { useEffect, useState } from 'react';
import { DashboardDetail } from '@/src/types/dashboard';
import { headerHttp } from '@/src/apis/dashboard';

import router from 'next/router';
import DoubleButtonModal from '../../Modal/DoubleButtonModal';
import NewInviteModal from '../../Modal/ModalType/NewInviteModal/NewInviteModal';
import useModal from '@/src/hooks/useModal';
import HeaderMyProfile from './HeaderMyProfile';
import HeaderMemberProfile from './HeaderMemberProfile';

interface Props {
  title?: string;
  dashboardId?: number;
  hasBackward: boolean;
}

const Header = ({ title, dashboardId, hasBackward }: Props) => {
  const { modalState, openModal, closeModal } = useModal();
  const [dashboardDetail, setDashboardDetail] = useState<DashboardDetail>();

  const loadDashboardDetail = async (dashboardId: number) => {
    const response = await headerHttp.getDashboardDetail(dashboardId);
    setDashboardDetail(response);
  };

  useEffect(() => {
    if (dashboardId) {
      loadDashboardDetail(dashboardId);
    }
  }, [dashboardId]);

  const isOwner = dashboardDetail?.createdByMe;

  return (
    <>
      {modalState && (
        <DoubleButtonModal size={'small'} isOpen={modalState} onClose={closeModal}>
          <NewInviteModal dashboardId={dashboardId} onClose={closeModal} />
        </DoubleButtonModal>
      )}
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          {hasBackward && (
            <Image
              className={styles.iconBackward}
              width={20}
              height={20}
              src={iconBackward}
              onClick={() => router.back()}
              alt={`뒤로 가기.`}
            />
          )}
          {title ? (
            <p className={styles.title}>{title}</p>
          ) : (
            <p className={styles.titleDetail}>{dashboardDetail?.title}</p>
          )}
          {isOwner && <Image className={styles.iconCrown} src={iconCrown} alt={`대시보드.`} />}
        </div>

        <div className={styles.operation}>
          {isOwner && (
            <div className={styles.buttonGroup}>
              <button onClick={() => router.push({ pathname: `/Dashboard/${dashboardId}/Edit` })}>
                <Image src={iconSetting} alt={`관리하기 버튼.`} />
                관리
              </button>
              <button onClick={() => openModal()}>
                <Image src={iconAdd} alt={`초대하기 버튼.`} />
                초대하기
              </button>
            </div>
          )}
          {dashboardId && (
            <>
              <HeaderMemberProfile dashboardId={dashboardId} />
              <div className={styles.line} />
            </>
          )}
          <HeaderMyProfile />
        </div>
      </header>
    </>
  );
};

export default Header;
