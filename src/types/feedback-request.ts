import { PeerFeedbackResponse } from "responses";
import { Feedback } from "./feedback";
import { FormWithQuestion } from "./form";
import { User } from "./user";

export type FeedbackRequest = {
  id: number;
  reviewerId: number;
  revieweeId: number;
  formId: number;
  createdByUserId: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  reviewer: User;
  reviewee: User;
  createdByUser: User;
  form: FormWithQuestion;
  feedback: Feedback;
};
export type SendOut360Request = {
  formId: number;
};

export type SendOutPeerRequest = {
  formId: number;
  revieweeId: number;
  reviewerIds: number[];
  dueDate: Date;
};

export type SendOutPeerFormData = {
  formId: number;
  revieweeId?: number;
  reviewerIds: number[];
  dueDate: Date;
};

export type EmployeeRequest360FeedbackBody = {
  formId: number;
  userIds: number[];
};

export type PeerFeedbackListQuery = {
  take: number;
  skip: number;
  keyword?: string;
};

export type PeerFeedbackTableItem = PeerFeedbackResponse & {
  id: string;
};
