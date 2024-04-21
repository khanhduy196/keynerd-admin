import Joi from "joi";
import { createOrderDetailSchema } from "./create-order-detail-schema";

export const createOrderSchema = Joi.object({
  note: Joi.string().allow('').optional(),
  details: Joi.array()
    .items(createOrderDetailSchema)
    .min(1)
    .required()
    .messages({
      "array.base": "Details must be an array",
      "array.min": "At least one detail is required",
      "any.required": "Details are required",
    }),
});
