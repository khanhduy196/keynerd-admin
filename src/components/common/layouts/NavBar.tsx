import Avatar from "./Avatar";
import { NavbarDropdownButtonGroup } from "../ui";

type Props = {
  avatar: string;
  fullName: string;
};
const NavBar: React.FC<Props> = ({ avatar, fullName }) => {
  return (
    <nav className="w-full h-[88px] pr-6 pt-8 pb-4 flex justify-end bg-blue-10 text-neutral-200 body-14-semibold">
      <div className="h-full flex gap-4 items-center">
        <NavbarDropdownButtonGroup />
        <div className="flex gap-2 items-center">
          <Avatar avatar={avatar} />
          <span>{fullName}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
