import Joi from "joi";
import { SendOut360Request } from "types/feedback-request";

export const sendOut360Schema = Joi.object<SendOut360Request>({
  formId: Joi.number().required().messages({
    "any.required": "Form is required.",
  }),
});
