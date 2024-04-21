import { IMultipleChoiceOption } from "types/common";

export const toOptions = <T extends object>(
  list: T[],
  key: keyof T,
  label: keyof T
): IMultipleChoiceOption[] => {
  return list.map<IMultipleChoiceOption>((item) => ({
    value: String(item[key]),
    label: String(item[label]),
  }));
};
