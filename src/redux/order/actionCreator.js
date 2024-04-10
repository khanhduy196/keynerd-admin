import { message } from 'antd';
import actions from './actions';
import { DEFAULT_PAGE_SIZE } from '../../utility/constants';
import { DataService } from '../../config/dataService/dataService';

const createOrder = (data) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.createOrderBegin());
      await DataService.post('/admin/order', data);
      await dispatch(actions.createOrderSuccess());
      message.success('Create order successfully');
    } catch (err) {
      await dispatch(actions.createOrderError(err));
    }
  };
};

const updateOrderStatus = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      await dispatch(actions.updateOrderStatusBegin());
      await DataService.post('/admin/order/status', data);

      message.success('Update order status successfully');
    } finally {
      await dispatch(actions.updateOrderStatusDone());
    }
  };
};

const getOrderList = (pageSize = DEFAULT_PAGE_SIZE, page = 1, status = null) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.getOrderListBegin());
      const response = await DataService.get(
        `/admin/order/list?currentPage=${page}&&itemsPerPage=${pageSize}&&status=${status}`,
      );
      await dispatch(actions.getOrderListSuccess(response.data));
    } catch (err) {
      await dispatch(actions.getOrderListErr(err));
    }
  };
};

export { createOrder, getOrderList, updateOrderStatus };
