import {
  CardListResponse,
  ColumnListResponse,
  DashboardDetailResponse,
  DashboardListResponse,
  MemberListResponse,
  UserInfoResponse,
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

export type UserInfo = UserInfoResponse;
