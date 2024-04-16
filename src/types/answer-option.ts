export type AnswerOption = {
  id: number;
  label: string;
  sequence: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type CreateEditAnswerOptionRequest = Pick<
  AnswerOption,
  "label" | "sequence"
> & {
  id?: number;
};
