import {
  CardListResponse,
  ColumnListResponse,
  DashboardDetailResponse,
  DashboardListResponse,
  MemberListResponse,
} from '../apis/schema/dashboardResponse';

export type ColumnList = ColumnListResponse['data'][number];

export interface CardList {
  cards: Cards;
  totalCount: number;
  cursorId: number;
}
export type Cards = CardListResponse['cards'][number];
export type Assignee = Cards['assignee'];

export interface DashboardList {
  map(arg0: (dashboard: any) => import('react').JSX.Element): import('react').ReactNode;
  dashboards: Dashboards;
  totalCount: number;
  cursorId: any;
}
export type Dashboards = DashboardListResponse['dashboards'][number];

export type DashboardDetail = DashboardDetailResponse;

export interface MemberList {
  members: Members;
  totalCount: number;
}
export type Members = MemberListResponse['members'][number];
