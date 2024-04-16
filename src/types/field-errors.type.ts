// For fields: text area, text field, Date,...
type SingleValue = string | number | Date | undefined;

// For fields: async dropdown (e.g. choose reviewers)
type MultiValue = string[] | number[];

type FieldValue = SingleValue | MultiValue;

export type FieldErrors<T> = {
  [K in keyof T]?: T[K] extends FieldValue ? string : FieldErrors<T[K]>;
};
