import { Column } from "react-table";
import { useMemo } from "react";
import { Table } from "components/common/forms";
import { UserProfileResponse } from "responses";

type TableMyReviewersProps = {
  users: UserProfileResponse[];
};
const TableMyReviewers: React.FC<TableMyReviewersProps> = ({ users }) => {
  const columns: Column<UserProfileResponse>[] = useMemo(
    () => [
      {
        Header: "Reviewer's email",
        accessor: "email",
        id: "email",
      },
      {
        Header: "Reviewer's name",
        accessor: "fullName",
        id: "fullName",
      },
    ],
    []
  );
  return (
    <Table
      columns={columns}
      data={users}
      cellClassName="first:pl-[80px] last:pr-[80px]"
    />
  );
};

export default TableMyReviewers;
