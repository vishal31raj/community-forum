export interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  savesCount: number;
  hasSaved: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  data: T[];
}
