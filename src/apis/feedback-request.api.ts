import { AxiosResponse } from "axios";
import { ENDPOINT_URL } from "constants/api-url";
import { FormType } from "enums/form";
import {
  PeerFeedbackListResponse,
  TodoRequestResponse,
  UserProfileResponse,
} from "responses";
import { CreateFeedbackRequestResponse } from "responses/create-feedback-request.response";
import { TotalOfTodoRequestResponse } from "responses/todo-request.response";
import {
  EmployeeRequest360FeedbackBody,
  FeedbackRequest,
  PeerFeedbackListQuery,
  SendOut360Request,
  SendOutPeerRequest,
} from "types/feedback-request";
import { RequestAnytimeFeedbackRequest } from "types/request-anytime-feedback";
import { http } from "utils";

const CONTROLLER_PREFIX = ENDPOINT_URL.FEEDBACK_REQUEST;

const FeedbackRequestApi = {
  send360ToAll: (data: SendOut360Request): Promise<AxiosResponse> => {
    return http.post(`${CONTROLLER_PREFIX}/send-out-360`, data);
  },

  sendOutPeer: (data: SendOutPeerRequest): Promise<AxiosResponse> => {
    return http.post(`${CONTROLLER_PREFIX}/send-out-peer`, data);
  },

  get: async (): Promise<TodoRequestResponse[]> => {
    const res = await http.get<TodoRequestResponse[]>(CONTROLLER_PREFIX);
    return res.data;
  },

  getByFormType: async (formType: FormType): Promise<TodoRequestResponse[]> => {
    const res = await http.get<TodoRequestResponse[]>(
      `${CONTROLLER_PREFIX}/by-form-type/${formType}`
    );
    return res.data;
  },

  request360Feedback: async (
    data: EmployeeRequest360FeedbackBody
  ): Promise<CreateFeedbackRequestResponse> => {
    const res = await http.post(`${CONTROLLER_PREFIX}/request-360`, data);
    return res.data;
  },

  requestAnytimeFeedback: (
    data: RequestAnytimeFeedbackRequest
  ): Promise<AxiosResponse> => {
    return http.post(`${CONTROLLER_PREFIX}/request-anytime`, data);
  },

  getById: async (id: number): Promise<FeedbackRequest> => {
    const res = await http.get<FeedbackRequest>(`${CONTROLLER_PREFIX}/${id}`);
    const { data } = res;
    return data;
  },

  getMyReviewersByFormId: async (
    formId: number
  ): Promise<UserProfileResponse[]> => {
    const res = await http.get<UserProfileResponse[]>(
      `${CONTROLLER_PREFIX}/reviewers?formId=${formId}`
    );
    const { data } = res;
    return data;
  },

  getMyRevieweesByFormId: async (
    formId: number
  ): Promise<UserProfileResponse[]> => {
    const res = await http.get<UserProfileResponse[]>(
      `${CONTROLLER_PREFIX}/reviewees/${formId}`
    );
    const { data } = res;
    return data;
  },

  getPeerFeedbackList: async (query: PeerFeedbackListQuery) => {
    const res = await http.get<PeerFeedbackListResponse>(
      `${CONTROLLER_PREFIX}/peer`,
      { params: query }
    );

    const { data } = res;
    return data;
  },

  getTotalsOfTodoRequest: async (): Promise<TotalOfTodoRequestResponse[]> => {
    const res = await http.get<TotalOfTodoRequestResponse[]>(
      `${CONTROLLER_PREFIX}/totals-of-todo-request`
    );
    return res.data;
  },
};

export default FeedbackRequestApi;
