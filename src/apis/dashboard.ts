import createHttpClient from './createHttpClient';
import { ColumnListResponse, CardListResponse, DashboardListResponse } from '@/src/apis/schema/dashboardResponse';

const httpClient = createHttpClient();

export const dashboardHttp = {
  getColumnList: async (dashboardId: number) =>
    await httpClient.get<ColumnListResponse>(`/columns?dashboardId=${dashboardId}`),
  getCardList: async (columnId: number) =>
    await httpClient.get<CardListResponse>(`/cards?size=10&columnId=${columnId}`),
  // delete: async () => await httpClient.delete<ColumnResponse>(`/columns?dashboardId=${n}`),
};

export const sidebarHttp = {
  getDashboardList: async (page: number, size: number) =>
    await httpClient.get<DashboardListResponse>(`/dashboards?navigationMethod=pagination&page=${page}&size=${size}`),
};
