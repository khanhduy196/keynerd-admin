import { FormType } from "enums/form";
import { CreateEditQuestionRequest, Question } from "./question";

export type Form = {
  id: number;
  name: string;
  description: string;
  dueDate?: Date;
  formType: FormType;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type FormWithQuestion = Form & {
  questions: Question[];
};

export type CreateEditFormRequest = Pick<
  Form,
  "name" | "description" | "dueDate" | "formType"
> & {
  id?: number;
  questions: CreateEditQuestionRequest[];
};

export type FormFilter = {
  formType?: FormType[];
};

export type GetFormViewQuery = {
  feedbackRequestId?: number;
  revieweeId?: number;
};
