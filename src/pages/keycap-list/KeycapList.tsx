import { Button, Table } from "components/common/forms";
import Pagination from "components/common/forms/Pagination";
import SearchField from "components/common/forms/SearchField";
import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import { DrawIcon, EyeIcon } from "components/icons";
import { DEFAULT_PAGINATED_LIST_REQUEST } from "constants/common";
import { useError, useHttpQueryService } from "hooks";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { GetPaginatedListResponse } from "responses/common";
import { KeycapListItem } from "responses/keycap-response";
import KeycapService from "services/keycap.service";
import { GetPaginatedListRequest } from "types/common";

const KeycapList = () => {
  const [paginatedListRequest, setPaginatedListRequest] =
    useState<GetPaginatedListRequest>(DEFAULT_PAGINATED_LIST_REQUEST);
  const {
    result: paginatedList,
    isLoading,
    refetch,
    error,
  } = useHttpQueryService<GetPaginatedListResponse<KeycapListItem>>({
    request: undefined,
  });

  useError(error, true);

  const columns: Column<KeycapListItem>[] = useMemo(
    () => [
      {
        Header: "Name",
        id: "name",
        Cell: ({ row }: { row: { original: KeycapListItem } }) => (
          <div className="flex">
            <img
              className="w-[100px] h-[100px]"
              src={row.original.photos[0]}
              alt=""
            />
            <div className="ml-4 flex flex-col justify-center">
              <span>{row.original.name}</span>
            </div>
          </div>
        ),
      },
      {
        Header: () => null,
        id: "buttons",
        Cell: ({ row }: { row: { original: KeycapListItem } }) => (
          <div className="flex items-center justify-end gap-4">
            <Link to={`update/${row.original.id}`}>
              <DrawIcon className="w-[24px] h-[24px] text-neutral-100" />
            </Link>
            <Link to={`view/${row.original.id}`}>
              <EyeIcon className="w-[24px] h-[24px] text-neutral-100" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    refetch(() => KeycapService.getList(paginatedListRequest));
  }, [paginatedListRequest]);

  const paginationOnChange = (currentPage: number, itemsPerPage: number) => {
    setPaginatedListRequest({
      ...paginatedListRequest,
      currentPage,
      itemsPerPage,
    });
  };

  const handleSearchOnChange = (value: string) => {
    setPaginatedListRequest({
      ...paginatedListRequest,
      searchQuery: value,
    });
  };

  return (
    <Layout>
      <div className="flex justify-between mb-10">
        <PageTitle>Keycap</PageTitle>
        <Link to={"create"}>
          <Button label="Create a new keycap" />
        </Link>
      </div>
      <LoadingWrapper isLoading={isLoading}>
        {paginatedList && (
          <>
            <div className="flex justify-between">
              <SearchField
                value={paginatedListRequest.searchQuery}
                handleValueChange={handleSearchOnChange}
                placeholder="Search by name"
                className="w-[300px]"
                autoFocus
              />

              <Pagination
                className="mb-4"
                itemsPerPage={paginatedList.itemsPerPage}
                totalPages={paginatedList.totalPages}
                currentPage={paginatedList.currentPage}
                onChange={paginationOnChange}
              />
            </div>

            <Table columns={columns} data={paginatedList.items} />
          </>
        )}
      </LoadingWrapper>
    </Layout>
  );
};

export default KeycapList;
