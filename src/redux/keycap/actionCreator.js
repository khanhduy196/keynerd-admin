import { message } from 'antd';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const getKeycapList = (pageSize, page = 1) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.getListBegin());
      const response = await DataService.get(`/admin/keycap/list?currentPage=${page}&&itemsPerPage=${pageSize}`);
      await dispatch(actions.getListSuccess(response.data));
    } catch (err) {
      await dispatch(actions.getListErr(err));
    }
  };
};

const getKeycap = (id) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.getKeycapBegin());
      const response = await DataService.get(`/admin/keycap/${id}`);
      await dispatch(actions.getKeycapSuccess(response.data));
    } catch (err) {
      await dispatch(actions.getKeycapErr(err));
    }
  };
};

const createKeycap = (data) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.createKeycapBegin());
      const formData = new FormData();
      formData.append('name', data.name);
      data.details.forEach((detail, index) => {
        formData.append(`details[${index}][profile]`, detail.profile);
        formData.append(`details[${index}][size]`, detail.size);
        formData.append(`details[${index}].file`, detail.file);
      });

      data.photos.forEach((photo) => {
        formData.append('photos', photo);
      });
      await DataService.post('/admin/keycap', formData);
      await dispatch(actions.createKeycapSuccess());
      message.success('Create keycap successfully');
    } catch (err) {
      await dispatch(actions.createKeycapError(err));
    }
  };
};

const deleteKeycap = (id) => {
  return async (dispatch, getState) => {
    await DataService.delete(`/admin/keycap/${id}`);
    message.success('Delete keycap successfully');
    const { paginatedList } = getState().keycapStore;
    dispatch(getKeycapList(paginatedList.itemsPerPage, paginatedList.currentPage));
  };
};

const updateKeycap = (id, data) => {
  return async (dispatch) => {
    try {
      await dispatch(actions.updateKeycapBegin());
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('id', id);
      data.details.forEach((detail, index) => {
        formData.append(`details[${index}][profile]`, detail.profile);
        formData.append(`details[${index}][size]`, detail.size);
        formData.append(`details[${index}].file`, detail.file);
      });
      await DataService.put('/admin/keycap', formData);
      await dispatch(actions.updateKeycapSuccess());
      message.success('Create keycap successfully');
    } catch (err) {
      await dispatch(actions.updateKeycapError(err));
    }
  };
};
export { getKeycapList, createKeycap, deleteKeycap, getKeycap, updateKeycap };
