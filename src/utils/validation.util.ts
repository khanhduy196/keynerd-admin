import { ValidationError } from "joi";
import { set } from "lodash";
import { FieldErrors } from "types/field-errors.type";

export const transformValidationError = <T extends object>(
  error: ValidationError
): FieldErrors<T> => {
  const validationErrors: FieldErrors<T> = {};

  error.details.forEach((detail) => {
    if (!detail?.path) return;

    const path = detail.path;
    const value = detail.message;

    set(validationErrors, path, value);
  });

  return validationErrors;
};
