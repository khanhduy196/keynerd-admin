import { PropsWithChildren } from "react";
import cx from "classnames";

export type ButtonProps = PropsWithChildren & {
  label?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger" | "form";
  size?: "large" | "medium" | "small";
};

const Button: React.FC<ButtonProps> = ({
  label = "",
  onClick,
  className,
  disabled,
  Icon,
  type = "button",
  children,
  variant = "primary",
  size = "medium",
}) => {
  return (
    <button
      className={cx(
        "rounded-full disabled:pointer-events-none w-fit transition duration-300",
        {
          "bg-turquoise-75 text-neutral-15 hover:bg-turquoise-25 disabled:text-neutral-50 disabled:bg-neutral-15 disabled:border disabled:border-neutral-25":
            variant === "primary",
          "text-neutral-100 border border-neutral-50 hover:bg-turquoise-5 hover:text-turquoise-75 disabled:border-neutral-25 disabled:text-neutral-25":
            variant === "secondary",
          "text-neutral-100 border border-neutral-25 hover:text-turquoise-75 disabled:border-neutral-25 disabled:text-neutral-25":
            variant === "form",
          "text-state-error-100 border border-state-error-100 hover:bg-state-error-80 disabled:border-neutral-25 disabled:text-neutral-25":
            variant === "danger",
          "px-6 py-2 body-16-medium": size === "medium",
          "px-12 py-3 body-20-medium": size === "large",
          "p-1": size === "small",
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {Icon && <Icon className="mr-2" width={24} height={24} />}
      {children ? children : label}
    </button>
  );
};

export default Button;
