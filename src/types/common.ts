export type GetPaginatedListRequest = {
    itemsPerPage: number;
    currentPage: number;
    searchQuery?: number;
  };

export type OptionItem = {
  value: string;
  display: string;
}