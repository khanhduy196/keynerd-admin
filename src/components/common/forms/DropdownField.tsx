import { ChangeEventHandler, InputHTMLAttributes } from "react";
import cx from "classnames";
import { OptionItem } from "types/common";

export type DropdownProps = InputHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label?: string;
  hint?: string;
  options: OptionItem[];
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  name?: string;
  errorMessage?: string;
  onClearError?: () => void;
};

const DropdownField: React.FC<DropdownProps> = ({
  id,
  label,
  hint,
  options,
  value,
  onChange,
  className,
  name = id,
  disabled,
  errorMessage,
  onClearError,
  ...inputAttributes
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex flex-col">
        {label && (
          <label htmlFor={id} className="body-16-semibold text-neutral-200">
            {label}
          </label>
        )}

        <span className="body-12-regular text-neutral-50">{hint}</span>
      </div>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={cx(
          "border rounded-2xl border-neutral-25 outline-none py-[10px] px-4 mb-1 appearance-none bg-no-repeat form-select disabled:bg-neutral-15 focus:border-turquoise-100 body-14-regular text-neutral-200 placeholder:text-neutral-50",
          { "border-state-error-100": errorMessage },
          className
        )}
        name={name}
        disabled={disabled}
        onFocus={onClearError}
        {...inputAttributes}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          );
        })}

      </select>
    </div>
  );
};

export default DropdownField;
