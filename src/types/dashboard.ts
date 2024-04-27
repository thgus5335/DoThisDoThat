import { ColumnListResponse, CardListResponse } from '../apis/schema/dashboardResponse';

export type ColumnList = ColumnListResponse['data'][number];

export interface CardList {
  cards: Cards;
  totalCount: number;
  cursorId: number;
}

export type Cards = CardListResponse['cards'][number];
export type Assignee = Cards['assignee'];
