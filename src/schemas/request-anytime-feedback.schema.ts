import Joi from "joi";
import {
  MAXIMUM_FORM_TITLE,
  MAXIMUM_SLACK_TEXT_FIELD,
} from "constants/form-fields.constant";

export const requestAnytimeFeedbackSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(MAXIMUM_FORM_TITLE)
    .required()
    .messages({
      "string.max": `Anytime Feedback title must not exceed ${MAXIMUM_FORM_TITLE} characters`,
      "string.empty": "Anytime Feedback title is required",
    }),
  dueDate: Joi.date().min(new Date()).required().messages({
    "date.base": "Due date must be a valid date",
    "date.min": "Due date must be greater than the current date",
    "any.required": "Due date is required",
  }),
  reviewerIds: Joi.array().items(Joi.number()).min(1).required().messages({
    "any.required": "At least one reviewer is required.",
    "array.min": "At least one reviewer is required.",
  }),
  description: Joi.string()
    .trim()
    .max(MAXIMUM_SLACK_TEXT_FIELD)
    .required()
    .messages({
      "string.max": `Anytime Feedback description must not exceed ${MAXIMUM_SLACK_TEXT_FIELD} characters`,
      "string.empty": "Anytime Feedback description is required",
    }),
});
