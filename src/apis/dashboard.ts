import createHttpClient from './createHttpClient';
import {
  ColumnListResponse,
  CardListResponse,
  DashboardListResponse,
  MemberListResponse,
  DashboardDetailResponse,
  UserInfoResponse,
} from '@/src/apis/schema/dashboardResponse';

const httpClient = createHttpClient();

export const dashboardHttp = {
  getColumnList: async (dashboardId: number) =>
    await httpClient.get<ColumnListResponse>(`/columns?dashboardId=${dashboardId}`),

  getCardList: async (columnId: number, cursorId?: number) =>
    cursorId
      ? await httpClient.get<CardListResponse>(`/cards?size=10&cursorId=${cursorId}&columnId=${columnId}`)
      : await httpClient.get<CardListResponse>(`/cards?size=10&columnId=${columnId}`),
};

export const headerHttp = {
  getDashboardDetail: async (dashboardId: number) =>
    await httpClient.get<DashboardDetailResponse>(`/dashboards/${dashboardId}`),
  getMemberList: async (dashboardId: number) =>
    await httpClient.get<MemberListResponse>(`/members?page=1&size=20&dashboardId=${dashboardId}`),
  getUserInfo: async () => await httpClient.get<UserInfoResponse>('users/me'),
};

export const sidebarHttp = {
  getDashboardList: async (page: number, size: number) =>
    await httpClient.get<DashboardListResponse>(`/dashboards?navigationMethod=pagination&page=${page}&size=${size}`),
};
