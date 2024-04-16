import { IMultipleChoiceOption } from "types/input.type";

export const toMultipleChoiceOptions = <T extends object>(
  list: T[],
  key: keyof T,
  label: keyof T
): IMultipleChoiceOption[] => {
  return list.map<IMultipleChoiceOption>((item) => ({
    value: String(item[key]),
    label: String(item[label]),
  }));
};
