import { FormType } from "enums/form";
import { ShortFeedbackResponse } from "./short-feedback.response";
import { ShortFormResponse } from "./short-form.response";
import { UserProfileResponse } from "./user-profile.response";

export type TodoRequestResponse = {
  id: number;
  dueDate: Date;
  form: ShortFormResponse;
  reviewee: UserProfileResponse;
  feedback?: ShortFeedbackResponse;
};

export type TotalOfTodoRequestResponse = {
  formType: FormType
  total: number
};

