import React, { PropsWithChildren } from "react";
import cx from "classnames";

type Props = PropsWithChildren<{
  className?: string;
}>;
const PageTitle: React.FC<Props> = ({ className, children }) => {
  return <h6 className={cx("text-neutral-200", className)}>{children}</h6>;
};

export default PageTitle;
