import classNames from "classnames";
import RadioButton from "./RadioButton";
import { IMultipleChoiceOption } from "types/common";

interface IRadioProps {
  id?: string | number;
  direction?: "horizontal" | "vertical";
  label?: string;
  hint?: string;
  options: IMultipleChoiceOption[];
  selectedValue?: string | number;
  onChange?: (value: string | number) => void;
}

const RadioGroup: React.FC<IRadioProps> = ({
  id = "",
  direction = "vertical",
  label = "",
  hint = "",
  options,
  selectedValue,
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
          { "flex-row space-x-4": direction === "horizontal" }
        )}
      >
        {options.map((option, index) => {
          const itemId = `${id}-radio-${index}-${option.value}`;
          return (
            <RadioButton
              key={itemId}
              onChange={onChange}
              option={option}
              id={itemId}
              isSelected={option.value === selectedValue}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
