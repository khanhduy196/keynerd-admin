import { Answer } from "./answer";
import { User } from "./user";

export type AnswerWithReviewer = {
  answer: Answer;
  reviewer?: User;
};

export type AnswersGroupedByQuestion = {
  [questionId: number]: AnswerWithReviewer[];
};
