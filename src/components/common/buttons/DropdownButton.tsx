import { Link } from "react-router-dom";
import cx from "classnames";
import { useOutsideClick } from "hooks";
import { useCallback } from "react";

type DropdownItemType = {
  label: string;
  link: string;
};
type DropdownButtonProps = {
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  items: DropdownItemType[];
  open: boolean;
  onChange: (newState: boolean) => void;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  Icon,
  items,
  open,
  onChange,
}) => {
  const handleCloseDropdown = useCallback(() => {
    onChange(false);
  }, []);

  const ref = useOutsideClick<HTMLDivElement>(handleCloseDropdown);

  const handleClickButton = () => {
    onChange(!open);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className={cx(
          "text-neutral-100 border border-neutral-50 hover:bg-turquoise-5 hover:text-turquoise-75 focus:bg-turquoise-5 focus:text-turquoise-75 disabled:border-neutral-25 disabled:text-neutral-25 px-4 py-2 rounded-full shadow-sm",
          {
            "text-turquoise-75 bg-turquoise-5 border-turquoise-75": open,
          }
        )}
        onClick={handleClickButton}
      >
        <div className="flex gap-2 items-center">
          <Icon />
          <span>{label}</span>
        </div>
      </button>
      {open && (
        <div className="absolute top-[50px] right-0 border border-neutral-25 bg-neutral-0 p-2 rounded-lg flex flex-col gap-2 z-10 shadow-md">
          {items.map(({ label, link }, index) => {
            return (
              <Link
                className="w-[275px] h-10 pl-4 rounded-md hover:bg-neutral-15 flex items-center text-neutral-200 body-16-regular"
                key={index}
                to={link}
                onClick={handleCloseDropdown}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
