import Image from 'next/legacy/image';
import styles from './HeaderMemberProfile.module.scss';

import { useEffect, useState } from 'react';
import { MemberList, Members } from '@/src/types/dashboard';
import { headerHttp } from '@/src/apis/dashboard';
import { getRandomcolorForPrefix } from '@/src/utils/makeRandomColor';

interface Props {
  dashboardId: number;
}

const HeaderMemberProfile = ({ dashboardId }: Props) => {
  const MAX_PROFILE = 4;
  const [isMemberDropdown, setIsMemberDropdown] = useState(false);
  const [totalMember, setTotalMember] = useState<MemberList['totalCount']>(0);
  const [memberList, setMemberList] = useState<Members[]>([]);

  const loadMemberList = async (dashboardId: number) => {
    const response = await headerHttp.getMemberList(dashboardId);
    setMemberList(response.members);
  };

  const loadtotalMember = async (dashboardId: number) => {
    const response = await headerHttp.getMemberList(dashboardId);
    setTotalMember(response['totalCount']);
  };

  const handleMemberDropdown = () => {
    setIsMemberDropdown(prev => !prev);
  };

  useEffect(() => {
    if (dashboardId) {
      loadMemberList(dashboardId);
      loadtotalMember(dashboardId);
    }
  }, [dashboardId]);

  const exProfileCount = totalMember - MAX_PROFILE;
  if (totalMember > MAX_PROFILE) {
  }
  for (let i = 0; i < MAX_PROFILE; i++) {}

  const profileCount = totalMember > MAX_PROFILE ? MAX_PROFILE + 1 : totalMember;
  const profileCountObj: { [key: string]: number } = {
    1: 0,
    2: -1,
    3: -2,
    4: -3,
    5: -4,
  };

  return (
    <>
      <div
        className={styles.memberprofileGroup}
        style={{ marginRight: `${profileCountObj[profileCount]}rem` }}
        onMouseOver={handleMemberDropdown}
        onMouseOut={handleMemberDropdown}>
        {memberList &&
          memberList.map(
            (member, index) =>
              index < MAX_PROFILE && (
                <div key={member.id}>
                  {member.profileImageUrl ? (
                    <div className={styles.memberProfile} style={{ left: `${index * -1}rem` }}>
                      <Image
                        className={styles.memberProfile}
                        width={38}
                        height={38}
                        src={member.profileImageUrl}
                        alt={'프로필 이미지.'}
                      />
                    </div>
                  ) : (
                    <div
                      className={styles.memberProfile}
                      style={{
                        left: `${index * -1}rem`,
                        backgroundColor: getRandomcolorForPrefix(member.nickname.substring(0, 1)).color,
                      }}
                      key={member.id}>
                      {member.nickname.substring(0, 1)}
                    </div>
                  )}
                </div>
              )
          )}
        {totalMember > 4 && (
          <div className={styles.plusProfile} style={{ left: `${(profileCount - 1) * -1}rem` }}>
            +{exProfileCount}
          </div>
        )}

        {isMemberDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.memberList}>
              {memberList &&
                memberList.map(member => (
                  <div className={styles.member} key={member.id}>
                    {member.profileImageUrl ? (
                      <Image
                        className={styles.allMemberProfile}
                        width={30}
                        height={30}
                        src={member.profileImageUrl}
                        alt={'프로필 이미지.'}
                      />
                    ) : (
                      <div
                        className={styles.allMemberProfile}
                        style={{
                          backgroundColor: getRandomcolorForPrefix(member.nickname.substring(0, 1)).color,
                        }}>
                        {member.nickname.substring(0, 1)}
                      </div>
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
