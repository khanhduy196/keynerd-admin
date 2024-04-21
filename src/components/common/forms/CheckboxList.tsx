import classNames from "classnames";
import Checkbox from "./Checkbox";
import { IMultipleChoiceOption } from "types/common";

interface ICheckboxListProps {
  direction?: "horizontal" | "vertical";
  label?: string;
  hint?: string;
  options: IMultipleChoiceOption[];
  selectedValues?: string[];
  onChange?: (value: string | number) => void;
}

const CheckboxList: React.FC<ICheckboxListProps> = ({
  direction = "vertical",
  label = "",
  hint = "",
  options,
  selectedValues,
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
      <div
        className={classNames(
          "flex justify-start",
          { "flex-col space-y-2": direction === "vertical" },
          { "flex-row space-x-2": direction === "horizontal" }
        )}
      >
        {options.map((option, index) => {
          return (
            <Checkbox
              key={index}
              option={option}
              isSelected={
                selectedValues
                  ? selectedValues.includes(String(option.value))
                  : false
              }
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxList;
