import { OrderStatus } from "enums/order-enum";
import { GetPaginatedListRequest } from "./common";

export type CreateOrderRequest = {
  note: string;
  details: CreateOrderDetailRequest[];
};

export type CreateOrderDetailRequest = {
  key?: number;
  keycapId?: number;
  keycapDetailId?: number;
  quantity: number;
};

export type GetPaginatedOrderListRequest = GetPaginatedListRequest & {
  status?: OrderStatus
}

export type UpdateOrderStatusRequest = {
  id: number;
  status: OrderStatus;
};
