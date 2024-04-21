import { ChangeEventHandler, InputHTMLAttributes } from "react";
import cx from "classnames";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  type?: "text" | "number";
  label?: string;
  hint?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  errorMessage?: string;
  onClearError?: () => void;
};
const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  hint,
  value,
  onChange,
  className,
  name = id,
  errorMessage,
  onClearError,
  type = "text",
  ...inputAttributes
}) => {
  return (
    <div className="flex flex-col gap-1">
      {(label || hint) && (
        <div className="mb-2 flex flex-col">
          {label && (
            <label htmlFor={id} className="body-16-semibold text-neutral-200">
              {label}
            </label>
          )}

          {hint && (
            <span className="body-12-regular text-neutral-50">{hint}</span>
          )}
        </div>
      )}

      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        className={cx(
          "border rounded-2xl border-neutral-25 outline-none py-[10px] px-4 mb-1 disabled:bg-neutral-15 focus:border-turquoise-100 body-14-regular text-neutral-200 placeholder:text-neutral-50",
          { "border-state-error-100": errorMessage },
          className
        )}
        onFocus={onClearError}
        {...inputAttributes}
      />
    </div>
  );
};

export default TextField;
