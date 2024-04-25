export interface ColumnList {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardList {
  cards: Cards[];
  totalCount: number;
  cursorId: number;
}

export interface Cards {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
  imageUrl?: string;
  teamId: string;
  dashboardId: number;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
