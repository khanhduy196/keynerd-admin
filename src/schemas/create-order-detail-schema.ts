import Joi from "joi";

export const createOrderDetailSchema = Joi.object({
  key: Joi.number().optional(),
  keycapId: Joi.number().required().messages({
    "any.required": "Keycap is required",
  }),
  keycapDetailId: Joi.number().required().messages({
    "any.required": "Size is required",
  }),  
  quantity: Joi.number().required().min(1).messages({
    "number.base": "Quantity is required",
    "any.required": "Quantity is required",
  }),  
});
