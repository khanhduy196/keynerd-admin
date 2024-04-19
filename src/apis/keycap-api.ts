import { ENDPOINT_URL } from "constants/api-url";
import { GetPaginatedListResponse } from "responses/get-paginated-list-response";
import { KeycapListItem } from "responses/keycap-response";
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

  create: async (
    request: CreateKeycapRequest
  ): Promise<GetPaginatedListResponse<KeycapListItem>> => {
    const res = await http.post<GetPaginatedListResponse<KeycapListItem>>(
      `${CONTROLLER_PREFIX}`,
      {
        params: request,
      }
    );
    return res.data;
  },
};

export default KeycapApi;
