import actions from './actions';

const initialState = {
  paginatedList: {
    items: [],
    totalItems: 0,
    totalPages: 0,
    itemsPerPage: 15,
    currentPage: 1,
  },
  keycap: {
    id: null,
    name: '',
    photos: [],
    detail: [],
  },
  isGettingKeycaps: false,
  isCreatingKeycap: false,
  isCreatingKeycapFail: false,
  isGettingKeycap: false,
  isUpdatingKeycap: false,
  isUpdatingKeycapFail: false,
};

const keycapReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.GET_LIST_KEYCAPS_BEGIN:
      return {
        ...state,
        isGettingKeycaps: true,
      };
    case actions.GET_LIST_KEYCAPS_SUCCESS:
      return {
        ...state,
        paginatedList: { ...data },
        isGettingKeycaps: false,
      };
    case actions.GET_LIST_KEYCAPS_ERR:
      return {
        ...state,
        isGettingKeycaps: false,
      };
    case actions.CREAT_KEYCAP_BEGIN:
      return {
        ...state,
        isCreatingKeycap: true,
        isCreatingKeycapFail: false,
      };
    case actions.CREAT_KEYCAP_SUCCESS:
      return {
        ...state,
        isCreatingKeycap: false,
      };
    case actions.CREAT_KEYCAP_ERROR:
      return {
        ...state,
        isCreatingKeycap: false,
        isCreatingKeycapFail: true,
      };
    case actions.GET_KEYCAP_BEGIN:
      return {
        ...state,
        isGettingKeycap: true,
      };
    case actions.GET_KEYCAP_SUCCESS:
      return {
        ...state,
        keycap: { ...data },
        isGettingKeycap: false,
      };
    case actions.GET_KEYCAP_ERR:
      return {
        ...state,
        isGettingKeycap: false,
      };
    case actions.UPDATE_KEYCAP_BEGIN:
      return {
        ...state,
        isUpdatingKeycap: true,
        isUpdatingKeycapFail: false,
      };
    case actions.UPDATE_KEYCAP_SUCCESS:
      return {
        ...state,
        isUpdatingKeycap: false,
      };
    case actions.UPDATE_KEYCAP_ERROR:
      return {
        ...state,
        isUpdatingKeycap: false,
        isUpdatingKeycapFail: true,
      };
    default:
      return { ...initialState };
  }
};

export default keycapReducer;
