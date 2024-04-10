const actions = {
  GET_ORDER_LIST_BEGIN: 'GET_ORDER_LIST_BEGIN',
  GET_ORDER_LIST_SUCCESS: 'GET_ORDER_LIST_SUCCESS',
  GET_ORDER_LIST_ERR: 'GET_ORDER_LIST_ERR',
  CREAT_ORDER_BEGIN: 'CREAT_ORDER_BEGIN',
  CREAT_ORDER_SUCCESS: 'CREAT_ORDER_SUCCESS',
  CREAT_ORDER_ERROR: 'CREAT_ORDER_ERR',
  DELETE_ORDER_BEGIN: 'DELETE_ORDER_BEGIN',
  UPDATE_ORDER_STATUS_BEGIN: 'UPDATEE_ORDER_STATUS_BEGIN',
  UPDATE_ORDER_STATUS_DONE: 'UPDATE_ORDER_STATUS_DONE',

  getOrderListBegin: () => {
    return {
      type: actions.GET_ORDER_LIST_BEGIN,
    };
  },

  getOrderListSuccess: (data) => {
    return {
      type: actions.GET_ORDER_LIST_SUCCESS,
      data,
    };
  },

  getOrderListErr: (err) => {
    return {
      type: actions.GET_ORDER_LIST_ERR,
      data: err,
    };
  },

  createOrderBegin: () => {
    return {
      type: actions.CREAT_ORDER_BEGIN,
    };
  },

  createOrderSuccess: () => {
    return {
      type: actions.CREAT_ORDER_SUCCESS,
    };
  },

  createOrderError: (error) => {
    return {
      type: actions.CREAT_ORDER_ERROR,
      data: error,
    };
  },

  updateOrderStatusBegin: () => {
    return {
      type: actions.UPDATE_ORDER_STATUS_BEGIN,
    };
  },
  updateOrderStatusDone: () => {
    return {
      type: actions.UPDATE_ORDER_STATUS_DONE,
    };
  },
};

export default actions;
