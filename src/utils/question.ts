import { QuestionType } from "enums/form";
import { AnswerOption } from "types/answer-option";
import {
  BaseQuestion,
  CreateEditQuestionRequest,
  OptionQuestion,
  Question,
  TextQuestion,
} from "types/question";

const REQUIRED_ANSWER_OPTIONS_QUESTIONS = [
  QuestionType.CHECK_BOXES,
  QuestionType.MULTIPLE_CHOICE,
];

export const checkOptionQuestionType = (type: QuestionType) => {
  return REQUIRED_ANSWER_OPTIONS_QUESTIONS.includes(type);
};

const createOptionQuestionObject = (data: BaseQuestion) => {
  const question: OptionQuestion = {
    ...data,
    questionType: QuestionType.MULTIPLE_CHOICE,
    answerOptions: [],
  };
  return question;
};

const createTextQuestionObject = (data: BaseQuestion) => {
  const question: TextQuestion = {
    ...data,
    questionType: QuestionType.TEXT,
  };
  return question;
};

const createCheckboxQuestionObject = (data: BaseQuestion) => {
  const question: OptionQuestion = {
    ...data,
    questionType: QuestionType.CHECK_BOXES,
    answerOptions: [],
  };
  return question;
};

export const createQuestionObject = (
  type: QuestionType,
  data: BaseQuestion
): Question => {
  switch (type) {
    case QuestionType.MULTIPLE_CHOICE:
      return createOptionQuestionObject(data);
    case QuestionType.CHECK_BOXES:
      return createCheckboxQuestionObject(data);
    default:
      return createTextQuestionObject(data);
  }
};
export const isOptionQuestion = (
  question: Question
): question is OptionQuestion => {
  const optionQuestion = question as OptionQuestion;
  return (
    typeof optionQuestion.id === "number" &&
    typeof optionQuestion.sequence === "number" &&
    typeof optionQuestion.label === "string" &&
    typeof optionQuestion.hint === "string" &&
    typeof optionQuestion.questionType === "string" &&
    checkOptionQuestionType(optionQuestion.questionType) &&
    Array.isArray(optionQuestion.answerOptions) &&
    optionQuestion.answerOptions.every((option: AnswerOption) => {
      return typeof option.id === "number" && typeof option.label === "string";
    })
  );
};
/**
 * remove all negative ids added into question, answer option before
 */
export const sanitizeQuestionRequest = (
  question: Question
): CreateEditQuestionRequest => {
  const { id, label, hint, sequence } = question;
  if (isOptionQuestion(question)) {
    const { questionType, answerOptions } = question;
    const newOptions = answerOptions.map((option) => {
      const { id, label, sequence } = option;
      return id < 0 ? { label, sequence } : { id, label, sequence };
    });
    if (id < 0)
      return {
        label,
        hint,
        sequence,
        questionType,
        answerOptions: newOptions,
      };

    return {
      id,
      label,
      hint,
      sequence,
      questionType,
      answerOptions: newOptions,
    };
  }
  const { questionType } = question;
  if (id < 0)
    return {
      label,
      hint,
      sequence,
      questionType,
    };

  return { id, label, hint, sequence, questionType };
};
