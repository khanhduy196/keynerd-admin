import { FormType } from "enums/form";
import { Form } from "types/form";

export const is360Form = (form: Form) => {
  return form.formType === FormType.THREE_HUNDRED_SIXTY;
};
