export type GetPaginatedListRequest = {
    itemsPerPage: number;
    currentPage: number;
    searchQuery?: string;
  };

export interface IMultipleChoiceOption {
  value: string;
  label: string;
  isDisabled?: boolean;
}