import { PropsWithChildren } from "react";
import cx from "classnames";

type Props = PropsWithChildren & {
  className?: string;
};

const Main: React.FC<Props> = ({ children, className }) => {
  return (
    <main className="flex-1 pb-6 pr-6">
      <div
        className={cx("h-full bg-neutral-0 rounded-3xl px-8 py-8", className)}
      >
        {children}
      </div>
    </main>
  );
};

export default Main;
