import { CheckboxIcon } from "components/icons";
import { ChangeEventHandler } from "react";

type CheckboxSingleProps = {
  id?: string;
  label?: string;
  hint?: string;
  labelOfSingleOption: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const CheckboxSingle: React.FC<CheckboxSingleProps> = ({
  id,
  label,
  hint,
  labelOfSingleOption,
  checked,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <div className="mb-2 flex flex-col gap-1">
          <span className="body-16-semibold text-neutral-200">{label}</span>
          {hint && (
            <span className="body-12-regular text-neutral-50">{hint}</span>
          )}
        </div>
      )}
      <div className="flex items-center relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          className="peer shrink-0
        appearance-none w-[18px] h-[18px] m-[3px]
        border-2 border-neutral-100 rounded-sm bg-white
        checked:border-0 checked:w-6 checked:h-6 checked:m-0"
          onChange={onChange}
        />
        <label htmlFor={id} className={"ml-2 body-14-medium text-neutral-200"}>
          {labelOfSingleOption}
        </label>
        <CheckboxIcon className="h-6 w-6 top-0 left-0 absolute hidden peer-checked:block pointer-events-none" />
      </div>
    </div>
  );
};

export default CheckboxSingle;
