import { AnswerOption } from "./answer-option";
import { Feedback } from "./feedback";
import { Question } from "./question";

export type Answer = {
  id: number;
  questionId: number;
  question: Question;
  feedbackId: number;
  feedback?: Feedback;
  answerOptionId?: number;
  answerOptions?: AnswerOption;
  answerText?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type CreateAnswerRequest = {
  questionId: number;
  answerOptionId?: number;
  answerText?: string;
};
