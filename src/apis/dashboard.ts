import createHttpClient from './createHttpClient';
import { ColumnListResponse, CardListResponse } from '@/src/types/dashboardResponse';

const httpClient = createHttpClient();

const column = {
  view: async (dashboardId: number) => await httpClient.get<ColumnListResponse>(`/columns?dashboardId=${dashboardId}`),
  // delete: async () => await httpClient.delete<ColumnResponse>(`/columns?dashboardId=${n}`),
};

const card = {
  view: async (columnId: number) => await httpClient.get<CardListResponse>(`/cards?size=10&columnId=${columnId}`),
};

export const getColumnList = async (dashboardId: number) => {
  const result = await column.view(dashboardId);
  return result.data;
};

export const getCardList = async (columnId: number) => {
  const result = await card.view(columnId);
  return result;
};
