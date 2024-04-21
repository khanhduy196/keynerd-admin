import { debounce } from "lodash";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { OnChangeValue } from "react-select";
import AsyncSelect from "react-select/async";
import cx from "classnames";
import { IMultipleChoiceOption } from "types/common";

const DEFAULT_DEBOUNCE_WAIT_TIME_IN_MILLISECONDS = 500;

type AsyncDropdownProps<IsMulti extends boolean = false> = {
  id: string;
  label?: string;
  hint?: string;
  placeholder?: ReactNode;
  className?: string;
  value?: IMultipleChoiceOption;
  request: (inputValue: string) => Promise<IMultipleChoiceOption[]>;
  onChange?: (newValue: OnChangeValue<IMultipleChoiceOption, IsMulti>) => void;
  isMulti?: IsMulti;
  required?: boolean;
  errorMessage?: string;
  onClearError?: () => void;
};

const AsyncDropdown = <IsMulti extends boolean = false>({
  id,
  label,
  hint,
  placeholder,
  className,
  value,
  request,
  onChange,
  isMulti,
  required,
  errorMessage,
  onClearError,
}: AsyncDropdownProps<IsMulti>) => {
  const [defaultOptions, setDefaultOptions] = useState<IMultipleChoiceOption[]>(
    []
  );

  const loadOptions = useCallback(
    (
      inputValue: string,
      callback: (options: IMultipleChoiceOption[]) => void
    ) => {
      request(inputValue).then((options: IMultipleChoiceOption[]) => {
        callback(options);
      });
    },
    [request]
  );

  const debouncedLoadOptions = useMemo(
    () => debounce(loadOptions, DEFAULT_DEBOUNCE_WAIT_TIME_IN_MILLISECONDS),
    [loadOptions]
  );

  useEffect(() => {
    const updateDefaultOptions = async () => {
      const options = await request("");
      setDefaultOptions(options);
    };

    updateDefaultOptions();
  }, [request]);
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

      <AsyncSelect<IMultipleChoiceOption, IsMulti>
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={debouncedLoadOptions}
        onChange={onChange}
        placeholder={placeholder}
        className={cx(className)}
        value={value}
        isMulti={isMulti}
        required={required}
        onFocus={onClearError}
        classNames={{
          control: (state) =>
            cx(
              "!border !rounded-2xl py-1 px-4 body-14-regular text-neutral-200",
              {
                "!border-neutral-25": !state.isFocused,
                "!border-turquoise-75 !shadow-none": state.isFocused,
                "!border-state-error-100": errorMessage,
              }
            ),
          valueContainer: () => "!p-0",
          indicatorsContainer: () => "!p-0",
          dropdownIndicator: (state) =>
            cx("!pr-1", {
              "!text-neutral-100": !state.isDisabled,
              "!text-neutral-50": state.isDisabled,
            }),
          clearIndicator: () => "!text-neutral-100",
          loadingIndicator: (state) =>
            cx({
              "!text-neutral-100": !state.isDisabled,
              "!text-neutral-50": state.isDisabled,
            }),
          input: () => "!m-0 !p-0",
          placeholder: () => "!m-0 !text-neutral-50",
          menu: () => "body-14-regular",
          multiValue: () =>
            "!bg-neutral-20 !rounded-[6px] body-14-regular text-neutral-150",
        }}
        id={id}
      />
    </div>
  );
};

export default AsyncDropdown;
