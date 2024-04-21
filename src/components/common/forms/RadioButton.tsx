import classNames from "classnames";
import { SyntheticEvent } from "react";
import { IMultipleChoiceOption } from "types/common";


interface IRadioGroupProps {
  id: string | number;
  option: IMultipleChoiceOption;
  isSelected: boolean;
  onChange?: (value: string | number) => void;
}

const RadioButton: React.FC<IRadioGroupProps> = ({
  id,
  option,
  isSelected,
  onChange,
}) => {
  const handleOnChange = (e: SyntheticEvent) => {
    if (onChange) {
      const { value } = e.target as HTMLInputElement;
      onChange(value);
    }
  };

  const idStr = String(id);

  return (
    <div className="flex items-center">
      <input
        id={idStr}
        type="radio"
        checked={isSelected}
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        disabled={option.isDisabled === true}
        value={option.value}
        onChange={handleOnChange}
      />
      <label
        htmlFor={idStr}
        className={classNames("ml-2 text-sm", {
          "font-medium": isSelected,
        })}
      >
        {option.label}
      </label>
    </div>
  );
};

export default RadioButton;
