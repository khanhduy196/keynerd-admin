import { AxiosResponse } from "axios";
import { ENDPOINT_URL } from "constants/api-url";
import { GetPaginatedListResponse } from "responses/common";
import { OrderItem } from "responses/order-response";
import { CreateOrderRequest, GetPaginatedOrderListRequest, UpdateOrderStatusRequest } from "types/order.type";
import { http } from "utils";

const CONTROLLER_PREFIX = ENDPOINT_URL.ORDER;

const OrderApi = {
  getList: async (
    request: GetPaginatedOrderListRequest
  ): Promise<GetPaginatedListResponse<OrderItem>> => {
    const res = await http.get<GetPaginatedListResponse<OrderItem>>(
      `${CONTROLLER_PREFIX}/list`,
      {
        params: request,
      }
    );
    return res.data;
  },
  create: async (request: CreateOrderRequest): Promise<AxiosResponse> => { 
    return await http.post(`${CONTROLLER_PREFIX}`, request);
  },

  updateStatus: async (request: UpdateOrderStatusRequest): Promise<AxiosResponse> => { 
    return await http.put(`${CONTROLLER_PREFIX}/status`, request);
  },
};

export default OrderApi;
