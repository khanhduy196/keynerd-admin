import cx from "classnames";
import { AnonymousIcon } from "components/icons";

type AvatarProps = {
  avatar?: string;
  className?: string;
  size?: "large" | "medium" | "small";
};

const AVATAR_SIZE_MAP = {
  large: "w-14 h-auto",
  medium: "w-10 h-auto",
  small: "w-6 h-auto",
};

const Avatar: React.FC<AvatarProps> = ({
  avatar,
  className,
  size = "medium",
}) => {
  const sizeClassName = AVATAR_SIZE_MAP[size];
  if (avatar)
    return (
      <img
        src={avatar}
        alt="avatar"
        className={cx(
          "rounded-full object-cover fill",
          sizeClassName,
          className
        )}
      />
    );
  return <AnonymousIcon className={sizeClassName} />;
};

export default Avatar;
