import { IMultipleChoiceOption } from "./input.type";

//Define type of form data in Request Anytime Feedback page
export type RequestAnytimeFeedbackFormData = {
  name: string;
  dueDate: Date;
  reviewers: IMultipleChoiceOption[];
  description: string;
};

// Define type of request body to send to BE in Request Anytime Feedback page
export type RequestAnytimeFeedbackRequest = {
  name: string;
  dueDate: Date;
  reviewerIds: number[];
  description: string;
};
