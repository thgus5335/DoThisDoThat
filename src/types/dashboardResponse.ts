export interface ColumnListResponse {
  result: string;
  data: [
    {
      id: number;
      title: string;
      teamId: string;
      dashboardId: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

export interface CardListResponse {
  cards: [
    {
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
  ];
  totalCount: number;
  cursorId: number;
}
