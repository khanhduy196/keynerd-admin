import cx from "classnames";
import { PropsWithChildren } from "react";

type DivideProps = PropsWithChildren<{
  className?: string;
  childrenDirection?: "horizontal" | "vertical";
}>;

const Divide: React.FC<DivideProps> = ({
  childrenDirection = "vertical",
  className,
  children,
}) => {
  return (
    <div
      className={cx(
        "divide-neutral-25",
        { "divide-x": childrenDirection === "horizontal" },
        { "divide-y": childrenDirection === "vertical" },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Divide;
