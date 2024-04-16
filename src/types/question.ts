import { QuestionType } from "enums/form";
import { Answer } from "./answer";
import { AnswerOption, CreateEditAnswerOptionRequest } from "./answer-option";

export type BaseQuestion = {
  id: number;
  label: string;
  hint: string;
  sequence: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  answers?: Answer[];
};
type TextQuestionType = QuestionType.TEXT;
type OptionQuestionType =
  | QuestionType.MULTIPLE_CHOICE
  | QuestionType.CHECK_BOXES;

export type TextQuestion = BaseQuestion & {
  questionType: TextQuestionType;
};
export type OptionQuestion = BaseQuestion & {
  questionType: OptionQuestionType;
  answerOptions: AnswerOption[];
};
export type Question = TextQuestion | OptionQuestion;

export type CreateEditTextQuestionRequest = Pick<
  TextQuestion,
  "label" | "hint" | "sequence" | "questionType"
> & {
  id?: number;
};
export type CreateEditOptionQuestionRequest = Pick<
  OptionQuestion,
  "label" | "hint" | "sequence" | "questionType"
> & {
  answerOptions: CreateEditAnswerOptionRequest[];
  id?: number;
};
export type CreateEditQuestionRequest =
  | CreateEditTextQuestionRequest
  | CreateEditOptionQuestionRequest;
