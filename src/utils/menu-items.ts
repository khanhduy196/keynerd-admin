import {
  ADMIN_MENU_ITEM_PATHS,
  EMPLOYEE_MENU_ITEM_PATHS,
  MENU_ITEMS,
} from "constants/menu-items";
import { matchPath } from "react-router-dom";

type MenuItem = {
  disabled: boolean;
  to: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  badge?: string;
};

export const employeeMenuItems: MenuItem[] = EMPLOYEE_MENU_ITEM_PATHS.map(
  (path) => {
    return { to: path, ...MENU_ITEMS[path], disabled: false };
  }
);

export const isAdminMenuActive = (urlPathName: string): boolean => {
  return ADMIN_MENU_ITEM_PATHS.some((itemPath) =>
    isMenuItemActive(urlPathName, itemPath)
  );
};

export const isMenuItemActive = (
  urlPathName: string,
  menuItemPathName: string
): boolean => {
  const patterns = [menuItemPathName, ...MENU_ITEMS[menuItemPathName].children];
  return patterns.some((pattern) => !!matchPath(pattern, urlPathName));
};
