import { AnswersGroupedByQuestion } from "types/answer-with-reviewer.type";
import { Feedback } from "types/feedback";

export const groupByQuestion = (
  feedbacks: Feedback[]
): AnswersGroupedByQuestion => {
  const result = feedbacks.reduce((accumulator, feedback) => {
    const { reviewer, answers } = feedback;

    answers.forEach((answer) => {
      const { questionId } = answer;

      if (!accumulator[questionId]) {
        accumulator[questionId] = [];
      }

      accumulator[questionId].push({
        answer,
        reviewer,
      });
    });
    return accumulator;
  }, {} as AnswersGroupedByQuestion);

  return result;
};
