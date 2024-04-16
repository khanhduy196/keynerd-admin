import { ChangeEventHandler, InputHTMLAttributes } from "react";
import cx from "classnames";
import TextFormatter from "./TextEditor";

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label?: string;
  hint?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onTextFormatterChange?: (name: string, value: string) => void,
  className?: string;
  rows?: number;
  errorMessage?: string;
  onClearError?: () => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  hint,
  value,
  onChange,
  onTextFormatterChange,
  className,
  rows = 4,
  name = id,
  errorMessage,
  onClearError,
  disabled,
  ...inputAttributes
}) => {

  const onValueChange = (value: string) => {
    if (onTextFormatterChange) {
      onTextFormatterChange(name, value)
    }
  }

  return (
    <div className="flex flex-col">
      {label && (
        <div className="mb-2 flex flex-col gap-1">
          <label htmlFor={id} className="body-16-semibold text-neutral-200">
            {label}
          </label>
          <span className="body-12-regular text-neutral-50">{hint}</span>
        </div>
      )}

      {onTextFormatterChange ? (
        <TextFormatter
          id={id}
          value={value}
          rows={rows}
          onValueChange={onValueChange}
          {...inputAttributes}
        />
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          name={name}
          className={cx(
            "border rounded-2xl border-neutral-25 outline-none py-[10px] px-4 mb-1 disabled:bg-neutral-15 focus:border-turquoise-100 body-14-regular text-neutral-200 placeholder:text-neutral-50",
            {
              "border-state-error-100": errorMessage,
              "resize-none": disabled,
            },
            className
          )}
          disabled={disabled}
          onFocus={onClearError}
          {...inputAttributes}
        />
      )}

    </div>
  );
};
export default TextArea;
