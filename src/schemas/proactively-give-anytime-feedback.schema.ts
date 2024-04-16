import Joi from "joi";
import { MAXIMUM_FORM_TITLE } from "constants/form-fields.constant";

export const proactivelyGiveAnytimeFeedbackSchema = Joi.object({
  revieweeId: Joi.number().required().messages({
    "any.required": "Reviewee is required.",
  }),
  name: Joi.string()
    .trim()
    .max(MAXIMUM_FORM_TITLE)
    .required()
    .messages({
      "string.max": `Title must not exceed ${MAXIMUM_FORM_TITLE} characters`,
      "string.empty": "Title is required.",
    }),
  feedback: Joi.string().trim().required().messages({
    "string.empty": "Feedback is required.",
  }),
  isAnonymous: Joi.boolean().optional(),
});
