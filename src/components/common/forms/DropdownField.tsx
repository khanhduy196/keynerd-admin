import { ChangeEventHandler, InputHTMLAttributes } from "react";
import cx from "classnames";

type OptionLabelType = string;
type OptionValueType = string;
export type DropdownProps = InputHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  hint?: string;
  options: { [optionValue: OptionValueType]: OptionLabelType };
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
    <div className="flex flex-col gap-2">
      <div className="mb-2 flex flex-col gap-1">
        <label htmlFor={id} className="body-16-semibold text-neutral-200">
          {label}
        </label>
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
        {Object.keys(options).map((value: string) => (
          <option key={value} value={value}>
            {options[value]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownField;
