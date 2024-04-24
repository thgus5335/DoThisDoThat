import httpClient from './httpClient';

interface FetchInvitationsParams {
  teamId: string;
  size?: number;
  cursorId?: number;
  title?: string;
}

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
