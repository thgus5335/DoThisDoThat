import axios from 'axios';
import httpClient from './httpClient';

interface fetchDashboardsParams {
  teamId: string;
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}

// 대시보드 목록 불러오기
export const fetchDashboards = async (params: fetchDashboardsParams) => {
  try {
    const { teamId, navigationMethod, cursorId, page, size } = params;
    const response = await httpClient.get('/dashboards', {
      params: {
        teamId,
        navigationMethod,
        cursorId,
        page,
        size,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('대시보드 데이터를 불러오는데 실패했습니다:', error);
    throw error;
  }
};
