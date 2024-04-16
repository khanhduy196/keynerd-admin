export type GetPaginatedListResponse<T> = {
    totalItems: number;
    totalPages: number;
    itemsPerPage: number;
    currentPage: number,
    items: T[]
}