import Joi from "joi";
import { ProactivelyGive360FeedbackRequest } from "types/feedback";
import { CreateAnswerRequest } from "types/answer";

export const proactivelyGive360FeedbackSchema =
  Joi.object<ProactivelyGive360FeedbackRequest>({
    revieweeId: Joi.number().required().messages({
      "any.required": "Reviewee is required.",
    }),
    answers: Joi.array()
      .items(
        Joi.object<CreateAnswerRequest>({
          questionId: Joi.number().required().messages({
            "number.base": "Question id must be a number",
            "any.required": "Question id is required",
          }),
          answerOptionId: Joi.number().optional().messages({
            "number.base": "Answer option id must be a number",
          }),
          answerText: Joi.alternatives()
            .try(Joi.string().trim(), Joi.number())
            .optional()
            .messages({
              "string.base": "Answer text must be a string",
              "string.empty": "Answer text is required",
              "number.base": "Answer text must be a number",
            }),
        }).xor("answerOptionId", "answerText")
      )
      .messages({
        "array.base": "Answers must be an array",
        "any.required": "Answers are required",
      }),
    formId: Joi.number().required().messages({
      "string.empty": "Form id is required.",
    }),
  });
