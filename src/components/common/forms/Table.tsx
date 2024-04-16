import cx from "classnames";
import { Column, Row, useTable } from "react-table";

type TableProps<T extends { id: number | string }> = {
  columns: Column<T>[];
  data: T[];
  cellClassName?: string;
  lastRowRef?: React.LegacyRef<HTMLTableRowElement>;
  className?: string;
  noRecordImg?: string;
  noRecordText?: string;
  isLoading?: boolean;
};
const Table = <T extends { id: number | string }>({
  columns,
  data,
  cellClassName,
  lastRowRef,
  className,
  noRecordImg,
  noRecordText,
  isLoading,
}: TableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({
      columns,
      data,
    });

  const showNoRecordView =
    !isLoading && data.length === 0 && noRecordImg && noRecordText;

  return (
    <div
      className={cx(
        "relative border border-neutral-25 rounded-lg shadow-inner flex flex-col",
        //when showing no record view, table takes up the rest of the viewport height
        //must-have condition: put table in flex container
        { "flex-auto": showNoRecordView },
        className
      )}
    >
      <table className="w-full text-left" {...getTableProps()}>
        <thead className="uppercase bg-neutral-15 text-turquoise-200 subtitle border-b">
          {headerGroups.map((headerGroup, index) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    key={column.id}
                    className={cx("px-8 py-4", cellClassName)}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="body-14-regular text-neutral-200"
        >
          {rows.map((row: Row<T>, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b last:border-b-0 hover:bg-gray-50"
                key={row.original.id}
                ref={index === rows.length - 1 ? lastRowRef : undefined}
                id={String(row.original.id)}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={cx("px-8 py-3", cellClassName)}
                      key={index}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showNoRecordView && (
        <div className="flex-auto flex flex-col items-center justify-center gap-8">
          <img src={noRecordImg} alt="empty table" width={269} />
          <p className="body-16-regular text-neutral-100">{noRecordText}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
