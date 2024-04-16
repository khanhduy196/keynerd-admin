import { FormIcon, HomeIcon } from "components/icons";
import { PAGE_PATHS } from "./page-paths";

export const ADMIN_MENU_ITEM_PATHS = [
  PAGE_PATHS.HOME,
  PAGE_PATHS.FORM,
  PAGE_PATHS.REQUEST_SEND_TO_ALL,
  PAGE_PATHS.THREE60_FEEDBACK_LIST,
  PAGE_PATHS.PEER_FEEDBACK_LIST,
];
export const EMPLOYEE_MENU_ITEM_PATHS = [PAGE_PATHS.KEYCAP];

export const MENU_ITEMS = {
  [PAGE_PATHS.HOME]: {
    name: "Home",
    Icon: HomeIcon,
    children: [],
  },
  [PAGE_PATHS.KEYCAP]: {
    name: "Keycap",
    Icon: FormIcon,
    children: [],
  },
};
