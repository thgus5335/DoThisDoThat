import createHttpClient from './createHttpClient';

const httpClient = createHttpClient();

export const editDashboardHttp = {
  getDashboardInfo: async (dashboardId: number) => {
    const result = await httpClient.get(`/dashboards/${dashboardId}`);
    return result;
  },
  putDashboardInfo: async (dashboardId: number, modifiedDashboardInfo: object) => {
    const result = await httpClient.put(`/dashboards/${dashboardId}`, modifiedDashboardInfo);
    return result;
  },
  deleteDashboard: async (dashboardId: number) => {
    const result = await httpClient.delete(`dashboards/${dashboardId}`);
    return result;
  },
};

export const editMemberHttp = {
  getMemberList: async (page: number, dashboardId: number) => {
    const result = await httpClient.get(`members?page=${page}&size=5&dashboardId=${dashboardId}`);
    return result;
  },
  deleteMember: async (memberId: number) => {
    const result = await httpClient.delete(`members/${memberId}`);
    return result;
  },
};

export const editInvitationHttp = {
  getInvitationList: async (page: number, dashboardId: number) => {
    const result = await httpClient.get(`dashboards/${dashboardId}/invitations?page=${page}&size=5`);
    return result;
  },
  postInvitation: async (dashboardId: number, email: string) => {
    const result = await httpClient.post(`dashboards/${dashboardId}/invitations`, { email: email });
    return result;
  },
  deleteInvitation: async (dashboardId: number, invitationId: number) => {
    const result = await httpClient.delete(`dashboards/${dashboardId}/invitations/${invitationId}`);
    return result;
  },
};
