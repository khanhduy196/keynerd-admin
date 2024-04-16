import { MAXIMUM_NUMBER_OF_TODO_REQUEST_TO_DISPLAY } from "constants/feedback-request.constant";

export const getBadgeNumberForTodoRequest = (total: number): string => {
  if (!total) {
    return "";
  }
  return total > MAXIMUM_NUMBER_OF_TODO_REQUEST_TO_DISPLAY
    ? `${MAXIMUM_NUMBER_OF_TODO_REQUEST_TO_DISPLAY}+`
    : total.toString();
};
