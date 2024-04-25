import createHttpClient from './createHttpClient';

interface ColumnListResponse {
  result: string;
  data: [{ id: number; title: string; teamId: string; dashboardId: number; createdAt: string; updatedAt: string }];
}

const httpClient = createHttpClient();

const column = {
  view: async (dashboardId: number) => await httpClient.get<ColumnListResponse>(`/columns?dashboardId=${dashboardId}`),
  // delete: async () => await httpClient.delete<ColumnResponse>(`/columns?dashboardId=${n}`),
};

export const getColumnList = async (dashboardId: number) => {
  const result = await column.view(dashboardId);
  return result.data;
};
