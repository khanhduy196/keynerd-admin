import Joi from "joi";
import { FormType, QuestionType } from "enums/form";
import {
  MAXIMUM_FORM_TITLE,
  MAXIMUM_SLACK_TEXT_FIELD,
} from "constants/form-fields.constant";

const editAnswerOptionSchema = Joi.object({
  id: Joi.number().min(0).messages({
    "number.base": "Answer option id must be a number",
    "number.min": "Answer option id must be greater than or equal to 0",
  }),
  label: Joi.string().trim().max(255).required().messages({
    "string.base": "Answer option label must be a string",
    "string.max": "Answer option label must not exceed 255 characters",
    "string.empty": "Answer option label is required",
  }),
  sequence: Joi.number().min(0).required().messages({
    "number.base": "Answer option sequence must be a number",
    "number.min": "Answer option sequence must be greater than or equal to 0",
    "any.required": "Answer option sequence is required",
  }),
});

const editQuestionSchema = Joi.object({
  id: Joi.number().min(0).messages({
    "number.base": "Question id must be a number",
    "number.min": "Question id must be greater than or equal to 0",
  }),
  label: Joi.string().trim().required().messages({
    "string.base": "Question label must be a string",
    "string.empty": "Question label is required",
  }),
  hint: Joi.string().trim().allow("").required().messages({
    "string.base": "Question hint must be a string",
    "any.required": "Question hint is required",
  }),
  sequence: Joi.number().min(0).required().messages({
    "number.base": "Question sequence must be a number",
    "number.min": "Question sequence must be greater than or equal to 0",
    "any.required": "Question sequence is required",
  }),
  questionType: Joi.string()
    .valid(...Object.values(QuestionType))
    .required()
    .messages({
      "any.only": "Invalid question type",
      "any.required": "Question type is required",
    }),
  answerOptions: Joi.alternatives().conditional("questionType", {
    is: QuestionType.TEXT,
    then: Joi.forbidden().messages({
      "any.unknown": "Answer options are not allowed for text questions",
    }),
    otherwise: Joi.array()
      .items(editAnswerOptionSchema)
      .min(1)
      .required()
      .messages({
        "array.base": "Answer options must be an array",
        "array.min": "At least one answer option is required",
        "any.required": "Answer options are required",
      }),
  }),
});

export const editFormSchema = Joi.object({
  id: Joi.number().min(0).required().messages({
    "number.base": "Form id must be a number",
    "number.min": "Form id must be greater than or equal to 0",
    "any.required": "Form id is required",
  }),
  name: Joi.string()
    .trim()
    .max(MAXIMUM_FORM_TITLE)
    .required()
    .messages({
      "string.base": "Form name must be a string",
      "string.max": `Form name must not exceed ${MAXIMUM_FORM_TITLE} characters`,
      "string.empty": "Form name is required",
    }),
  description: Joi.string()
    .trim()
    .allow("")
    .max(MAXIMUM_SLACK_TEXT_FIELD)
    .required()
    .messages({
      "string.base": "Form description must be a string",
      "string.max": `Form description must not exceed ${MAXIMUM_SLACK_TEXT_FIELD} characters`,
      "any.required": "Form description is required",
    }),
  dueDate: Joi.when("formType", {
    is: FormType.THREE_HUNDRED_SIXTY,
    then: Joi.date().min(new Date()).required().messages({
      "date.base": "Due date must be a valid date",
      "date.min": "Due date must be greater than the current date",
      "any.required": "Due date is required for 360 Form",
    }),
    otherwise: Joi.any().optional().valid(null).messages({
      "any.only": "Due date must be skipped for Peer Form",
    }),
  }),
  formType: Joi.string()
    .valid(...Object.values(FormType))
    .required()
    .messages({
      "any.only": "Invalid form type",
      "any.required": "Form type is required",
    }),
  questions: Joi.array().items(editQuestionSchema).min(1).required().messages({
    "array.base": "Questions must be an array",
    "array.min": "At least one question is required",
    "any.required": "Questions are required",
  }),
});
