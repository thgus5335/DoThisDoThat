import createHttpClient from './createHttpClient';
import { DashboardListResponse } from '@/src/apis/schema/dashboardResponse';
const httpClient = createHttpClient();

interface FetchDashboardsParams {
  teamId: string;
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}

// 대시보드 목록 불러오기
export const myDashboardService = {
  fetchDashboards: async (params: FetchDashboardsParams) =>
    await httpClient.get<DashboardListResponse>('/dashboards', { params }),
};
