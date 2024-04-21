import { AxiosResponse } from "axios";
import { ENDPOINT_URL } from "constants/api-url";
import { GetPaginatedListResponse } from "responses/common";
import { KeycapListItem, KeycapViewItem } from "responses/keycap-response";
import { GetPaginatedListRequest } from "types/common";
import { CreateKeycapRequest } from "types/keycap.type";
import { http } from "utils";

const CONTROLLER_PREFIX = ENDPOINT_URL.KEYCAP;

const KeycapApi = {
  getList: async (
    request: GetPaginatedListRequest
  ): Promise<GetPaginatedListResponse<KeycapListItem>> => {
    const res = await http.get<GetPaginatedListResponse<KeycapListItem>>(
      `${CONTROLLER_PREFIX}/list`,
      {
        params: request,
      }
    );
    return res.data;
  },

  create: async (request: CreateKeycapRequest): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("name", request.name);
    request.details.forEach((detail, index) => {
      formData.append(`details[${index}][profile]`, detail.profile);
      formData.append(`details[${index}][size]`, detail.size.toString());
      formData.append(`details[${index}].file`, detail.file!);
    });
    request.photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    return await http.post(`${CONTROLLER_PREFIX}`, formData);
  },

  getById: async (id: number): Promise<KeycapViewItem> => {
    const res = await http.get(`${CONTROLLER_PREFIX}/${id}`);
    return res.data;
  },
};

export default KeycapApi;
