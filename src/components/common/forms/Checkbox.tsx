import { CheckboxIcon } from "components/icons";
import { IMultipleChoiceOption } from "types/common";


interface ICheckboxProps {
  option: IMultipleChoiceOption;
  isSelected: boolean;
  onChange?: (value: string | number) => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  option,
  isSelected,
  onChange,
}) => {
  const itemId = `default-checkbox-${option.value}-${option.label}`;
  const handleOnChange = () => {
    if (onChange) onChange(option.value);
  };

  return (
    <div className="flex items-center relative">
      <input
        id={itemId}
        type="checkbox"
        checked={isSelected}
        name="default-radio"
        className="peer shrink-0
        appearance-none w-[18px] h-[18px] m-[3px]
        border-2 border-neutral-100 rounded-sm bg-white
        checked:border-0 checked:w-6 checked:h-6 checked:m-0"
        disabled={option.isDisabled === true}
        value={option.value}
        onChange={handleOnChange}
      />
      <label
        htmlFor={itemId}
        className={"ml-2 body-14-medium text-neutral-200"}
      >
        {option.label}
      </label>
      <CheckboxIcon className="h-6 w-6 top-0 left-0 absolute hidden peer-checked:block pointer-events-none" />
    </div>
  );
};

export default Checkbox;
