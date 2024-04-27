import { IMultipleChoiceOption } from "types/common";
import DropdownField from "./DropdownField";
import cx from "classnames";
import { ChangeEvent, useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  className?: string;
  onChange?: (currentPage: number, itemsPerPage: number) => void;
};

const itemsPerPageOptions: IMultipleChoiceOption[] = [
  {
    value: "15",
    label: "15 items per page",
  },
  {
    value: "30",
    label: "30 items per page",
  },
];

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  className,
  totalPages,
  onChange,
}) => {
  const pageOptions = useMemo(() => {
    const options: IMultipleChoiceOption[] = [];
    for (let i = 1; i <= totalPages; i++) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
  }, [totalPages]);

  const itemsPerPageOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(1, Number(e.target.value));
    }
  };

  const currentPageOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(Number(e.target.value), itemsPerPage);
    }
  };

  return (
    <div className={cx("flex gap-2 items-baseline", className)}>
      <DropdownField
        className="w-[190px]"
        id="itemsPerPage"
        value={itemsPerPage.toString()}
        onChange={itemsPerPageOnChange}
        options={itemsPerPageOptions}
        name="itemsPerPage"
      />
      {totalPages > 1 && (
        <>
          <span>Page</span>
          <DropdownField
            className="w-[80px]"
            value={currentPage.toString()}
            onChange={currentPageOnChange}
            id="page"
            options={pageOptions ?? []}
            name="currentPage"
          />
          <span>Of {totalPages}</span>
        </>
      )}
    </div>
  );
};

export default Pagination;
