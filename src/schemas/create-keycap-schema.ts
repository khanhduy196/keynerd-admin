import Joi from "joi";
import { createKeycapDetailSchema } from "./create-keycap-detail-schema";

export const createKeycapSchema = Joi.object({
  photos: Joi.array().min(1).required().messages({
    "array.base": "Photos must be an array",
    "array.min": "At least one photo is required",
    "any.required": "Photos are required",
  }),
  name: Joi.string().trim().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
  }),
  details: Joi.array()
    .items(createKeycapDetailSchema)
    .min(1)
    .required()
    .messages({
      "array.base": "Details must be an array",
      "array.min": "At least one detail is required",
      "any.required": "Details are required",
    }),
});
