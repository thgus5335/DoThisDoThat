export interface DashboardInfo {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

export const initialDashboardInfo: DashboardInfo = {
  id: 0,
  title: '',
  color: '',
  createdAt: '',
  updatedAt: '',
  userId: 0,
  createdByMe: true,
};

export interface MemberList {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

export interface Invitee {
  id: number;
  email: string;
  nickname: string;
}

export interface InvitationList {
  id: number;
  invitee: Invitee;
}

export interface InvitationResponse {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: Invitee;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
