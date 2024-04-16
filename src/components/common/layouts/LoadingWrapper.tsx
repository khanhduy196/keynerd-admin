import { PropsWithChildren } from "react";
import LoadingIndicator from "./LoadingIndicator";
import cx from "classnames";

type Props = PropsWithChildren & {
  isLoading: boolean;
  className?: string;
};
const LoadingWrapper: React.FC<Props> = ({
  isLoading,
  children,
  className,
}) => {
  if (isLoading)
    return (
      <div
        className={cx(
          "w-full h-full box-border bg-white flex items-center justify-center",
          className
        )}
      >
        <LoadingIndicator />
      </div>
    );
  return <>{children}</>;
};

export default LoadingWrapper;
