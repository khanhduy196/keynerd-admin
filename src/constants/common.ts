import { GetPaginatedListRequest } from "types/common";
export const DEFAULT_ITEMS_PER_PAGE = 1;

export const DEFAULT_PAGINATED_LIST_REQUEST: GetPaginatedListRequest = {
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  currentPage: 1,
};
