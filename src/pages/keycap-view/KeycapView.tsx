import { BackButton, Table } from "components/common/forms";
import { Layout, LoadingWrapper, PageTitle } from "components/common/layouts";
import Gallery from "components/common/layouts/Gallery";
import { DownloadIcon } from "components/icons";
import { useError, useHttpQueryService, useNumericParam } from "hooks";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import {
  KeycapDetailViewItem,
  KeycapViewItem,
} from "responses/keycap-response";
import KeycapService from "services/keycap.service";

const KeycapView = () => {
  const id = useNumericParam("id");

  const {
    result: keycap,
    error,
    isLoading,
  } = useHttpQueryService<KeycapViewItem>({
    request: () => KeycapService.getById(id),
  });

  useError(error, true);

  const columns: Column<KeycapDetailViewItem>[] = useMemo(
    () => [
      {
        Header: "Profile",
        accessor: "profile",
        id: "profile",
      },
      {
        Header: "Size",
        id: "size",
        Cell: ({ row }: { row: { original: KeycapDetailViewItem } }) => (
          <span>{row.original.size}U</span>
        ),
      },
      {
        Header: () => null,
        id: "buttons",
        Cell: ({ row }: { row: { original: KeycapDetailViewItem } }) => (
          <div className="flex items-center justify-end">
            {row.original.fileUrl && (
              <Link to={row.original.fileUrl}>
                <DownloadIcon className="w-[24px] h-[24px] text-neutral-100" />
              </Link>
            )}
          </div>
        ),
      },
    ],
    []
  );
  return (
    <Layout>
      <LoadingWrapper isLoading={isLoading}>
        {keycap && (
          <div className="w-full h-fit pb-8">
            <div className="flex gap-6 items-center mb-6">
              <BackButton className="text-neutral-200" />
              <PageTitle>{keycap.name}</PageTitle>
            </div>
            <div className="flex flex-col gap-8">
              <Gallery photos={keycap.photos} />
              <Table
                className="w-full"
                columns={columns}
                data={keycap.details}
              />
            </div>
          </div>
        )}
      </LoadingWrapper>
    </Layout>
  );
};
export default KeycapView;
