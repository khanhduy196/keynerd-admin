import { FormType } from "enums/form";
import { UserProfileResponse } from "./user-profile.response";

export type FormFeedbackIProvidedResponse = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  formType: FormType;
  dueDate: Date;
  reviewees: UserProfileResponse[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};
