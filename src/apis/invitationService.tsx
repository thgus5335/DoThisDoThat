import httpClient from './httpClient';

interface FetchInvitationsParams {
  teamId: string;
  size?: number;
  cursorId?: number | null;
  title?: string;
}

interface UpdateInvitationParams {
  teamId: string;
  invitationId: number;
  accept: boolean;
}

// 초대된 대시보듬 목록 GET
export const fetchInvitations = async (params: FetchInvitationsParams) => {
  const { teamId, size, cursorId, title } = params;
  try {
    const response = await httpClient.get(`/invitations`, {
      params: {
        teamId,
        size,
        cursorId,
        title,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to load invitations', error);
    throw error;
  }
};

// 수락, 거절 버튼 클릭 시 PUT
export const updateInvitation = async ({ teamId, invitationId, accept }: UpdateInvitationParams) => {
  const body = { inviteAccepted: accept };
  try {
    const response = await httpClient.put(`/invitations/${invitationId}`, body, {
      params: {
        teamId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating invitation', error);
    throw error;
  }
};
