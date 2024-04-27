import createHttpClient from './createHttpClient';
import { ColumnListResponse, CardListResponse } from '@/src/apis/schema/dashboardResponse';

const httpClient = createHttpClient();

export const dashboardHttp = {
  getColumnList: async (dashboardId: number) =>
    await httpClient.get<ColumnListResponse>(`/columns?dashboardId=${dashboardId}`),
  getCardList: async (columnId: number) =>
    await httpClient.get<CardListResponse>(`/cards?size=10&columnId=${columnId}`),
  // delete: async () => await httpClient.delete<ColumnResponse>(`/columns?dashboardId=${n}`),
};
