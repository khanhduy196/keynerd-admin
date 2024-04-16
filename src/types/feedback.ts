import { FeedbackRequest } from "./feedback-request";
import { FormWithQuestion } from "./form";
import { User } from "./user";
import { Answer, CreateAnswerRequest } from "./answer";
import { IMultipleChoiceOption } from "./input.type";

export type Feedback = {
  id: number;
  reviewerId: number;
  revieweeId: number;
  formId: number;
  feedbackRequestId: number;
  isAnonymous: boolean;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  reviewer?: User;
  reviewee: User;
  form: FormWithQuestion;
  feedbackRequest: FeedbackRequest;
  answers: Answer[];
};

export type CreateFeedBackRequest = {
  feedbackRequestId: number;
  answers: CreateAnswerRequest[];
};

export type ProactivelyGive360FeedbackFormData = {
  reviewee?: IMultipleChoiceOption;
  answers: CreateAnswerRequest[];
};

export type ProactivelyGive360FeedbackRequest = {
  revieweeId?: number;
  formId: number;
  answers: CreateAnswerRequest[];
};
