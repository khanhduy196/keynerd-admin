import { IMultipleChoiceOption } from "./input.type";

export type ProactivelyGiveAnytimeFeedbackFormData = {
  name: string;
  reviewee?: IMultipleChoiceOption;
  feedback: string;
  isAnonymous: boolean;
};

export type ProactivelyGiveAnytimeFeedbackRequest = {
  name: string;
  revieweeId?: number;
  feedback: string;
  isAnonymous: boolean;
};
