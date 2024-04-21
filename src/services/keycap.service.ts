import KeycapApi from "apis/keycap-api";
import { AxiosResponse } from "axios";
import { GetPaginatedListResponse } from "responses/common";
import {
  KeycapViewItem,
  KeycapListItem,
} from "responses/keycap-response";
import { GetPaginatedListRequest } from "types/common";
import { CreateKeycapRequest } from "types/keycap.type";

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
};

export default KeycapService;
