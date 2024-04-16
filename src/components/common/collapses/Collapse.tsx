import { DownArrowIcon, UpArrowIcon } from "components/icons";
import { PropsWithChildren } from "react";

type CollapseProps = PropsWithChildren & {
  header: React.ReactNode;
  open: boolean;
  onChange: (open: boolean) => void;
};
const Collapse: React.FC<CollapseProps> = ({
  header,
  children,
  open,
  onChange,
}) => {
  return (
    <div className="w-full h-fit bg-blue-10 rounded-2xl shadow">
      <div className="flex px-6 py-4 justify-between items-center">
        {header}
        <div
          className="cursor-pointer text-neutral-100"
          onClick={() => onChange(!open)}
        >
          {open ? (
            <UpArrowIcon className="w-8 h-8" />
          ) : (
            <DownArrowIcon className="w-8 h-8" />
          )}
        </div>
      </div>

      {open && children}
    </div>
  );
};
export default Collapse;
