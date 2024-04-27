import cx from "classnames";
import { SearchIcon } from "components/icons";
import { ChangeEvent, InputHTMLAttributes } from "react";

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  handleValueChange: (value: string) => void;
  className?: string;
};

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  value,
  handleValueChange,
  className,
  ...inputAttributes
}) => {

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleValueChange(e.target.value);
  };

  return (
    <div className="relative w-fit">
      <input
        id="searchField"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cx(
          "border rounded-3xl border-neutral-25 outline-none py-[10px] pl-4 pr-14 mb-1 disabled:bg-neutral-15 focus:border-turquoise-100 body-14-regular text-neutral-200 placeholder:text-neutral-50 min-w-[230px]",
          className
        )}
        {...inputAttributes}
      />
      <label htmlFor={"searchField"} className="absolute top-[10px] right-4">
        <SearchIcon className="text-neutral-100 w-6 h-6" />
      </label>
    </div>
  );
};

export default SearchField;
