import KeycapApi from "apis/keycap-api";
import { GetPaginatedListResponse } from "responses/get-paginated-list-response";
import { KeycapListItem } from "responses/keycap-response";
import { GetPaginatedListRequest } from "types/common";

const KeycapService = {
  getList: async (
    request: GetPaginatedListRequest
  ): Promise<GetPaginatedListResponse<KeycapListItem>> => {
    const data = await KeycapApi.getList(request);
    return data;
  },
};

export default KeycapService;
