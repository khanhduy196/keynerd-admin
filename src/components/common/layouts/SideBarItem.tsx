import { Link } from "react-router-dom";
import cx from "classnames";

type Props = {
  to?: string;
  name: string;
  badge?: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
const SideBarItem: React.FC<Props> = ({
  to,
  name,
  Icon,
  badge,
  selected = false,
  disabled = false,
  onClick,
}) => {
  const className = cx(
    "w-full flex flex-row gap-4 items-center hover:bg-blue-15 rounded-xl box-border px-4 py-2 text-neutral-100 body-14-medium",
    { "pointer-events-none": disabled },
    { "text-neutral-50": disabled },
    { "text-turquoise-100 bg-blue-15": selected }
  );

  if (!to) {
    return (
      <div className={className} onClick={onClick}>
        <Icon width={24} height={24} />
        <span>{name}</span>
      </div>
    );
  }

  return (
    <Link to={to} className={className}>
      <Icon width={24} height={24} />
      <div className="flex justify-between w-full">
        <span>{name}</span>
        {badge && <span>{badge}</span>}
      </div>
    </Link>
  );
};

export default SideBarItem;
