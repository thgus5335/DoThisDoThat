import Image from 'next/legacy/image';
import styles from './HeaderMemberProfile.module.scss';

import { useEffect, useState } from 'react';
import { Members } from '@/src/types/dashboard';
import { headerHttp } from '@/src/apis/dashboard';

interface Props {
  dashboardId: number;
}

const HeaderMemberProfile = ({ dashboardId }: Props) => {
  const [isMemberDropdown, setIsMemberDropdown] = useState(false);
  const [memberList, setmemberList] = useState<Members[]>([]);

  const loadMemberList = async (dashboardId: number) => {
    const response = await headerHttp.getMemberList(dashboardId);
    setmemberList(response.members);
  };

  const handleMemberDropdown = () => {
    setIsMemberDropdown(prev => !prev);
  };

  useEffect(() => {
    if (dashboardId) {
      loadMemberList(dashboardId);
    }
  }, [dashboardId]);

  return (
    <>
      <div className={styles.memberprofileGroup} onMouseOver={handleMemberDropdown} onMouseOut={handleMemberDropdown}>
        {memberList &&
          memberList.map(member => (
            <div key={member.id}>
              {member.profileImageUrl ? (
                <Image
                  className={styles.memberProfile}
                  width={40}
                  height={40}
                  src={member.profileImageUrl}
                  alt={'프로필 이미지.'}
                />
              ) : (
                <div className={styles.memberProfile} key={member.id}>
                  {member.nickname.substring(0, 1)}
                </div>
              )}
            </div>
          ))}
        <div className={styles.plusProfile}>+9</div>
        {isMemberDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.memberList}>
              {memberList &&
                memberList.map(member => (
                  <div className={styles.member} key={member.id}>
                    {member.profileImageUrl ? (
                      <Image
                        className={styles.memberProfile}
                        width={40}
                        height={40}
                        src={member.profileImageUrl}
                        alt={'프로필 이미지.'}
                      />
                    ) : (
                      <div className={styles.memberProfile}>{member.nickname.substring(0, 1)}</div>
                    )}
                    <p className={styles.memberName}>{member.nickname}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderMemberProfile;
