import actions from './actions';

const initialState = {
  paginatedList: {
    items: [],
    totalItems: 0,
    totalPages: 0,
    itemsPerPage: 15,
    currentPage: 1,
  },
  isUpdatingOrderStatus: false,
  isGettingList: false,
  isCreatingOrder: false,
  isCreatingOrderFail: false,
};

const orderReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_ORDER_LIST_BEGIN:
      return {
        ...state,
        isGettingList: true,
      };
    case actions.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        paginatedList: { ...data },
        isGettingList: false,
      };
    case actions.GET_ORDER_LIST_ERR:
      return {
        ...state,
        isGettingList: false,
      };
    case actions.CREAT_ORDER_BEGIN:
      return {
        ...state,
        isCreatingOrder: true,
        isCreatingOrderFail: false,
      };
    case actions.CREAT_ORDER_SUCCESS:
      return {
        ...state,
        isCreatingOrder: false,
      };
    case actions.CREAT_ORDER_ERROR:
      return {
        ...state,
        isCreatingOrder: false,
        isCreatingOrderFail: true,
      };
    case actions.UPDATE_ORDER_STATUS_BEGIN:
      return {
        ...state,
        isUpdatingOrderStatus: true,
      };
    case actions.UPDATE_ORDER_STATUS_DONE:
      return {
        ...state,
        isUpdatingOrderStatus: false,
      };
    default:
      return { ...initialState };
  }
};

export default orderReducer;
