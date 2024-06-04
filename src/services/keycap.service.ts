import KeycapApi from "apis/keycap-api";
import { AxiosResponse } from "axios";
import { GetPaginatedListResponse } from "responses/common";
import {
  KeycapViewItem,
  KeycapListItem,
  KeycapDetailViewItem,
} from "responses/keycap-response";
import { GetPaginatedListRequest } from "types/common";
import { CreateKeycapRequest, UpdateKeycapRequest } from "types/keycap.type";

const KeycapService = {
  getList: async (
    request: GetPaginatedListRequest
  ): Promise<GetPaginatedListResponse<KeycapListItem>> => {
    const data = await KeycapApi.getList(request);
    return data;
  },

  create: async (request: CreateKeycapRequest): Promise<AxiosResponse> => {
    return await KeycapApi.create(request);
  },

  getById: async (id: number): Promise<KeycapViewItem> => {
    return await KeycapApi.getById(id);
  },

  getUsedDetailsOfKeycap: async (id: number): Promise<KeycapDetailViewItem[]> => {
    return await KeycapApi.getUsedDetailsOfKeycap(id);
  },


  update: async (request: UpdateKeycapRequest): Promise<AxiosResponse> => {
    return await KeycapApi.update(request);
  },
};

export default KeycapService;
