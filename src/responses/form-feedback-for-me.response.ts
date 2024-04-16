import { FormType } from "enums/form";
import { UserProfileResponse } from "./user-profile.response";

export type FormFeedbackForMeResponse = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  formType: FormType;
  dueDate: Date;
  reviewers: UserProfileResponse[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
