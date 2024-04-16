import { PropsWithChildren } from "react";
import cx from "classnames";
import { RightDoubleArrowIcon } from "components/icons";
import { IconSquareButton } from "../buttons";

type CollapsibleSidebarProps = PropsWithChildren & {
  isExpanding: boolean;
  onCollapse: () => void;
  title: string;
  className?: string;
};

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  isExpanding,
  onCollapse,
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cx(
        "flex flex-col transition-width duration-300",
        {
          "w-2/5 border-l border-neutral-20": isExpanding,
          "w-0 overflow-hidden h-0": !isExpanding,
        },
        className
      )}
    >
      <div className="flex flex-col gap-4 pt-8 pb-4 px-5 border-b border-neutral-20">
        <IconSquareButton Icon={RightDoubleArrowIcon} onClick={onCollapse} />
        <div>
          <span className="body-20-semibold text-neutral-150">{title}</span>
        </div>
      </div>
      <div className="px-5 pt-4 pb-8">{children}</div>
    </div>
  );
};

export default CollapsibleSidebar;
