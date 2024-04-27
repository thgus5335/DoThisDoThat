import createHttpClient from './createHttpClient';

const httpClient = createHttpClient();

export const editDashboardHttp = {
  getDashboardInfo: async (dashboardId: number) => {
    const data = await httpClient.get(`/dashboards/${dashboardId}`);
    return data;
  },
};
