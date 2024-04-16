import cx from "classnames";

type IconSquareButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const IconSquareButton: React.FC<IconSquareButtonProps> = ({
  className,
  onClick,
  disabled,
  Icon,
}) => {
  return (
    <button
      className={cx(
        className,
        "p-1 transition duration-300 w-fit text-neutral-100 rounded-md disabled:pointer-events-none disabled:bg-neutral-15 disabled:text-neutral-25 hover:bg-turquoise-10 hover:text-turquoise-75"
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <Icon />
    </button>
  );
};

export default IconSquareButton;
