import Button from "./Button";
import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";
import cx from "classnames";

type Props = PropsWithChildren &
  LinkProps & {
    label?: string;
    disabled?: boolean;
    variant?: "primary" | "secondary";
    size?: "large" | "medium";
    buttonClassName?: string;
  };

const LinkButton: React.FC<Props> = ({
  label,
  to = "/",
  children,
  disabled,
  buttonClassName,
  variant = "secondary",
  size = "medium",
  ...linkProps
}) => {
  return (
    <Link
      to={to}
      {...linkProps}
      className={cx({ "pointer-events-none": disabled })}
    >
      <Button
        disabled={disabled}
        className={cx("w-fit flex items-center gap-2", buttonClassName)}
        variant={variant}
        size={size}
        label={label}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
