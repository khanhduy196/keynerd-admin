import { ChangeEventHandler, InputHTMLAttributes } from "react";
import cx from "classnames";

type DateFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  id: string;
  label?: string;
  hint?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  errorMessage?: string;
  onClearError?: () => void;
};
const DateField: React.FC<DateFieldProps> = ({
  id,
  label,
  hint,
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
    <div className="flex flex-col w-full">
      {label && (
        <div className="mb-2 flex flex-col gap-1">
          <label htmlFor={id} className="body-16-semibold text-neutral-200">
            {label}
          </label>
          <span className="body-12-regular text-neutral-50">{hint}</span>
        </div>
      )}
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        onFocus={onClearError}
        className={cx(
          "border rounded-2xl border-neutral-25 outline-none py-[10px] px-4 mb-1 disabled:bg-neutral-15 focus:border-turquoise-100 body-14-regular text-neutral-200 placeholder:text-neutral-50",
          { "border-state-error-100": errorMessage },
          className
        )}
        {...inputAttributes}
      />
    </div>
  );
};

export default DateField;
