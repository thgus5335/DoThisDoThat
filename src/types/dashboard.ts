import { ColumnListResponse, CardListResponse, DashboardListResponse } from '../apis/schema/dashboardResponse';

export type ColumnList = ColumnListResponse['data'][number];

export interface CardList {
  cards: Cards;
  totalCount: number;
  cursorId: number;
}
export type Cards = CardListResponse['cards'][number];
export type Assignee = Cards['assignee'];

export interface DashboardList {
  dashboards: Dashboards;
  totalCount: number;
  cursorId: any;
}
export type Dashboards = DashboardListResponse['dashboards'][number];
