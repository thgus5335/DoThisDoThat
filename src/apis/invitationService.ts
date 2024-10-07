import createHttpClient from './createHttpClient';
import { InvitationResponse } from '@/src/apis/schema/dashboardResponse';

const httpClient = createHttpClient();

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

export const invitationService = {
  fetchInvitations: async (params: FetchInvitationsParams) =>
    await httpClient.get<InvitationResponse>('/invitations', { params }),
  updateInvitation: async ({ teamId, invitationId, accept }: UpdateInvitationParams) =>
    await httpClient.put<InvitationResponse, { inviteAccepted: boolean }>(
      `/invitations/${invitationId}?teamId=${teamId}`,
      {
        inviteAccepted: accept,
      }
    ),
};
