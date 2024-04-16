import { Button, Table } from "components/common/forms";
import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import { EyeIcon } from "components/icons";
import { DEFAULT_PAGINATED_LIST_REQUEST } from "constants/common";
import { useError, useHttpQueryService } from "hooks";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { KeycapListItem } from "responses/keycap-response";
import KeycapService from "services/keycap.service";
import { GetPaginatedListRequest } from "types/common";

const KeycapList = () => {
  const [paginatedListRequest, setPaginatedListRequest] =
    useState<GetPaginatedListRequest>(DEFAULT_PAGINATED_LIST_REQUEST);
  const {
    result: paginatedList,
    isLoading,
    error,
  } = useHttpQueryService({
    request: async () => KeycapService.getList(paginatedListRequest),
  });

  useError(error, true);

  const columns: Column<KeycapListItem>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        id: "name",
      },
      {
        Header: () => null,
        id: "buttons",
        Cell: ({ row }: { row: { original: KeycapListItem } }) => (
          <div className="flex items-center justify-end">
            <Link to={`${row.original.id}`}>
              <EyeIcon className="w-[24px] h-[24px] text-neutral-100" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Layout>
       <div className="flex justify-between mb-10">
          <PageTitle>Keycap</PageTitle>
          <Link to={"create"}>
            <Button label="Create a new keycap" />
          </Link>
        </div>
      <LoadingWrapper isLoading={isLoading}>
        <Table
          columns={columns}
          data={paginatedList ? paginatedList.items : []}
        />
      </LoadingWrapper>
    </Layout>
  );
};

export default KeycapList;
