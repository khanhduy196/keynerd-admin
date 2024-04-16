import { ChangeEventHandler, InputHTMLAttributes } from "react";
import cx from "classnames";
import { SearchIcon } from "components/icons";

type SearchFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder,
  value,
  onChange,
  className,
  ...inputAttributes
}) => {
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
