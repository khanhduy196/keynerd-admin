import cx from "classnames";
import IconSquareButton from "./IconSquareButton";

type IconSquareToggleButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  state?: "on" | "off";
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const IconSquareToggleButton: React.FC<IconSquareToggleButtonProps> = ({
  className,
  onClick,
  disabled,
  Icon,
  state = "off",
}) => {
  return (
    <IconSquareButton
      Icon={Icon}
      className={cx(className, {
        "text-neutral-100": state === "off",
        "text-turquoise-75 bg-turquoise-5": state === "on",
      })}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default IconSquareToggleButton;
