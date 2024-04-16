import { PAGE_PATHS } from "constants/page-paths";
import { Link } from "react-router-dom";
import cx from "classnames";

const LOGO_SIZE_MAP = {
  large: "h-12 w-auto",
  medium: "h-8 w-auto",
  small: "h-5 w-auto",
};

type LogoProps = {
  size?: "large" | "medium" | "small";
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ size = "medium", className }) => {
  const sizeClassName = LOGO_SIZE_MAP[size];

  return (
    <Link className={cx("cursor-pointer", className)} to={PAGE_PATHS.HOME}>
      <img src="/logo.png" alt="logo" className={sizeClassName} />
    </Link>
  );
};

export default Logo;
