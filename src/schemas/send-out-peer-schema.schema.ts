import Joi from "joi";
import { SendOutPeerRequest } from "types/feedback-request";

export const sendOutPeerSchema = Joi.object<SendOutPeerRequest>({
  formId: Joi.number().required().messages({
    "any.required": "Form is required.",
  }),
  revieweeId: Joi.number().required().messages({
    "any.required": "Reviewee is required.",
  }),
  reviewerIds: Joi.array().items(Joi.number()).min(1).required().messages({
    "any.required": "At least one reviewer is required.",
    "array.min": "At least one reviewer is required.",
  }),
  dueDate: Joi.date().min(new Date()).required().messages({
    "date.base": "Due date must be a valid date.",
    "date.min": "Due date must be greater than the current date.",
    "any.required": "Due date is required.",
  }),
});
