import Main from "./Main";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  mainClassName?: string;
};

const Layout: React.FC<Props> = ({ children, mainClassName }) => {
  return (
    <div className="w-full bg-blue-10">
      <div className="max-w-[1800px] mx-auto flex">
        <SideBar />
        <div className="w-full flex min-h-[100vh] flex-col">
          <NavBar avatar={""} fullName={"Admin"} />
          <Main className={mainClassName}>{children}</Main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
