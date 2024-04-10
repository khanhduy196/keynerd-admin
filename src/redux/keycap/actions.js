const actions = {
  GET_LIST_KEYCAPS_BEGIN: 'GET_LIST_KEYCAPS_BEGIN',
  GET_LIST_KEYCAPS_SUCCESS: 'GET_LIST_KEYCAPS_SUCCESS',
  GET_LIST_KEYCAPS_ERR: 'GET_LIST_KEYCAPS_SUCCESS',
  CREAT_KEYCAP_BEGIN: 'CREAT_KEYCAP_BEGIN',
  CREAT_KEYCAP_SUCCESS: 'CREAT_KEYCAP_SUCCESS',
  CREAT_KEYCAP_ERROR: 'CREAT_KEYCAP_ERR',
  DELETE_KEYCAP_BEGIN: 'DELETE_KEYCAP_BEGIN',
  GET_KEYCAP_BEGIN: 'GET_KEYCAP_BEGIN',
  GET_KEYCAP_SUCCESS: 'GET_KEYCAP_SUCCESS',
  GET_KEYCAP_ERR: 'GET_KEYCAP_ERR',
  UPDATE_KEYCAP_BEGIN: 'UPDATE_KEYCAP_BEGIN',
  UPDATE_KEYCAP_SUCCESS: 'UPDATE_KEYCAP_SUCCESS',
  UPDATE_KEYCAP_ERROR: 'UPDATE_KEYCAP_ERR',

  getListBegin: () => {
    return {
      type: actions.GET_LIST_KEYCAPS_BEGIN,
    };
  },

  getListSuccess: (data) => {
    return {
      type: actions.GET_LIST_KEYCAPS_SUCCESS,
      data,
    };
  },

  getListErr: (err) => {
    return {
      type: actions.GET_LIST_KEYCAPS_ERR,
      data: err,
    };
  },

  createKeycapBegin: () => {
    return {
      type: actions.CREAT_KEYCAP_BEGIN,
    };
  },

  createKeycapSuccess: () => {
    return {
      type: actions.CREAT_KEYCAP_SUCCESS,
    };
  },

  createKeycapError: (error) => {
    return {
      type: actions.CREAT_KEYCAP_ERROR,
      data: error,
    };
  },

  getKeycapBegin: () => {
    return {
      type: actions.GET_KEYCAP_BEGIN,
    };
  },

  getKeycapSuccess: (data) => {
    return {
      type: actions.GET_KEYCAP_SUCCESS,
      data,
    };
  },

  getKeycapErr: (err) => {
    return {
      type: actions.GET_KEYCAP_ERR,
      data: err,
    };
  },

  updateKeycapBegin: () => {
    return {
      type: actions.UPDATE_KEYCAP_BEGIN,
    };
  },

  updateKeycapSuccess: () => {
    return {
      type: actions.UPDATE_KEYCAP_SUCCESS,
    };
  },

  updateKeycapError: (error) => {
    return {
      type: actions.UPDATE_KEYCAP_ERROR,
      data: error,
    };
  },
};

export default actions;
