import { PropsWithChildren } from "react";
import cx from "classnames";

export type BadgetProps = PropsWithChildren & {
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "error" | "success" | "warning" ;
  size?: "large" | "medium" | "small";
};

const Badge: React.FC<BadgetProps> = ({
  label = "",
  className,
  variant = "secondary",
  size = "small",
}) => {
  return (
    <div
      className={cx(
        className,
        "rounded-full w-fit flex items-center justify-between gap-2 me-2",
        {
          "bg-state-error-100  text-neutral-0": variant === "error",
          "bg-state-success-60  text-neutral-0": variant === "success",
          "bg-state-warning-60  text-neutral-0": variant === "warning",
          "bg-turquoise-10 text-neutral-200 ": variant === "primary",
          "bg-neutral-15 text-neutral-100 ": variant === "secondary",
          "px-2.5 py-0.5 text-xs font-medium": size === "small",
          "px-6 py-2 text-xs font-medium": size === "medium",
          "px-12 py-3 body-20-medium": size === "large",
        }
      )}
    >
      {/* {variant !== "error" && (
        <div>
          <div
            className={cx("rounded-full", {
              "bg-turquoise-75": variant === "primary",
              "bg-neutral-50": variant === "secondary",

              "h-2 w-2": size === "small",
              "h-4 w-4": size === "medium",
              "h-8 w-8": size === "large",
            })}
          ></div>
        </div>
      )} */}
      {label}
    </div>
  );
};

export default Badge;
