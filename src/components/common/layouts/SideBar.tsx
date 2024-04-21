import { useLocation } from "react-router-dom";
import { employeeMenuItems, isMenuItemActive } from "utils/menu-items";

import SideBarItem from "./SideBarItem";

import Logo from "./Logo";

const SideBar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="sticky top-0 px-6 py-8 flex flex-col max-h-screen">
      <div className="mb-14">
        <Logo size="large" />
      </div>
      <div className="flex w-[232px] flex-col gap-4 flex-1">
        <div className="flex flex-grow w-full flex-col justify-between">
          <div className="flex w-full gap-2 flex-col">
            {employeeMenuItems.map((item, index) => {
              return (
                <SideBarItem
                  key={index + 1}
                  selected={isMenuItemActive(pathName, item.to)}
                  {...item}
                />
              );
            })}
          </div>
          {/* <SideBarItem
            key={0}
            name={"Log out"}
            Icon={LogoutIcon}
            onClick={handleLogout}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
