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

export interface DashboardDetailResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  createdByMe: boolean;
}

export interface MemberListResponse {
  members: [
    {
      id: number;
      email: string;
      nickname: string;
      profileImageUrl?: string;
      createdAt: string;
      updatedAt: string;
      isOwner: boolean;
      userId: number;
    }
  ];
  totalCount: number;
}

export interface DashboardListResponse {
  dashboards: [
    {
      id: number;
      title: string;
      color: string;
      userId: number;
      createdAt: string;
      updatedAt: string;
      createdByMe: boolean;
    }
  ];
  totalCount: number;
  cursorId: any;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: any;
  createdAt: string;
  updatedAt: string;
}
