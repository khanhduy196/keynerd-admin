import { Answer } from "types/answer";
import { UserProfileResponse } from "./user-profile.response";

export type FeedbackIProvidedResponse = {
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
  reviewee: UserProfileResponse;
  answers: Answer[];
};
