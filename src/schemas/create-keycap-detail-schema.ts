import { KeycapProfile } from "enums/keycap";
import Joi from "joi";

export const createKeycapDetailSchema = Joi.object({
  key: Joi.number().optional(),
  file: Joi.optional(),
  profile: Joi.string()
    .valid(...Object.values(KeycapProfile))
    .required()
    .messages({
      "any.only": "Invalid profile",
      "any.required": "Profile is required",
    }),
  size: Joi.number().required().messages({
    "any.required": "Size is required",
  }),
});
