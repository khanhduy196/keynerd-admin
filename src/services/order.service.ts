import OrderApi from "apis/order-api";
import { AxiosResponse } from "axios";
import { GetPaginatedListResponse } from "responses/common";
import { OrderItem } from "responses/order-response";
import {
  CreateOrderRequest,
  GetPaginatedOrderListRequest,
  UpdateOrderStatusRequest,
} from "types/order.type";

const OrderService = {
  getList: async (
    request: GetPaginatedOrderListRequest
  ): Promise<GetPaginatedListResponse<OrderItem>> => {
    const data = await OrderApi.getList(request);
    return data;
  },
  create: async (request: CreateOrderRequest): Promise<AxiosResponse> => {
    return await OrderApi.create(request);
  },
  updateStatus: async (request: UpdateOrderStatusRequest): Promise<AxiosResponse> => {
    return await OrderApi.updateStatus(request);
  },

  delete: async (id: number): Promise<AxiosResponse> => {
    return await OrderApi.delete(id);
  },
};

export default OrderService;
