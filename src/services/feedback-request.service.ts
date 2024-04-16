import { FeedbackRequestApi } from "apis";
import { FormType } from "enums/form";
import { PeerFeedbackListResponse, TodoRequestResponse } from "responses";
import { TotalOfTodoRequestResponse } from "responses/todo-request.response";
import {
  EmployeeRequest360FeedbackBody,
  PeerFeedbackListQuery,
  SendOut360Request,
  SendOutPeerRequest,
} from "types/feedback-request";
import { RequestAnytimeFeedbackRequest } from "types/request-anytime-feedback";

const FeedbackRequestService = {
  get: async (): Promise<TodoRequestResponse[]> => {
    const data = await FeedbackRequestApi.get();

    data.forEach((feedbackRequest) => {
      const { dueDate } = feedbackRequest;
      feedbackRequest.dueDate = new Date(dueDate);
    });

    return data;
  },

  getByFormType: async (formType: FormType): Promise<TodoRequestResponse[]> => {
    const data = await FeedbackRequestApi.getByFormType(formType);

    data.forEach((feedbackRequest) => {
      const { dueDate } = feedbackRequest;
      feedbackRequest.dueDate = new Date(dueDate);
    });

    return data;
  },

  getById: async (id: number) => {
    const res = await FeedbackRequestApi.getById(id);
    const { dueDate } = res;

    if (dueDate) {
      res.dueDate = new Date(dueDate);
    }

    return res;
  },

  send360ToAll: async (data: SendOut360Request) => {
    return await FeedbackRequestApi.send360ToAll(data);
  },

  sendOutPeer: async (data: SendOutPeerRequest) => {
    return await FeedbackRequestApi.sendOutPeer(data);
  },

  request360Feedback: async (data: EmployeeRequest360FeedbackBody) => {
    return await FeedbackRequestApi.request360Feedback(data);
  },

  requestAnytimeFeedback: async (data: RequestAnytimeFeedbackRequest) => {
    return await FeedbackRequestApi.requestAnytimeFeedback(data);
  },

  getMyReviewersByFormId: async (formId: number) => {
    return await FeedbackRequestApi.getMyReviewersByFormId(formId);
  },

  getMyRevieweesByFormId: async (formId: number) => {
    return await FeedbackRequestApi.getMyRevieweesByFormId(formId);
  },

  getPeerFeedbackList: async (
    query: PeerFeedbackListQuery
  ): Promise<PeerFeedbackListResponse> => {
    const { data, count } = await FeedbackRequestApi.getPeerFeedbackList(query);

    data.forEach((feedbackRequest) => {
      const { createdAt } = feedbackRequest;
      if (createdAt) feedbackRequest.createdAt = new Date(createdAt);
    });

    return { data, count };
  },

  getTotalsOfTodoRequest: async (): Promise<TotalOfTodoRequestResponse[]> => {
    const data = await FeedbackRequestApi.getTotalsOfTodoRequest();
    return data;
  },
};

export default FeedbackRequestService;
