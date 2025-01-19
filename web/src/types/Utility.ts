export interface PagingOptions {
  Page: number;
  PageSize: number;
  SortDirection: SortDirection;
}

export interface PagedResult<T> extends PagingOptions {
  TotalPages: number;
  SortBy?: (keyof T)[];
  Items: T[];
}

export enum SortDirection {
  Ascending,
  Descending,
}
