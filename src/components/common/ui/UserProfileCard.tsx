import classNames from "classnames";
import { Avatar } from "components/common/layouts";
import { UserProfile } from "types/user";

export type UserProfileCardProps = {
  user: UserProfile;
  showText?: boolean;
  showAvatar?: boolean;
  className?: string;
};

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  showText = true,
  showAvatar,
  className,
}) => {
  const { displayName, avatar } = user;

  return (
    <div
      className={classNames(
        "flex gap-2 items-center text-neutral-100",
        className
      )}
    >
      {showAvatar && <Avatar avatar={avatar} size="small" />}
      {showText && <span className="body-16-medium">{displayName}</span>}
    </div>
  );
};

export default UserProfileCard;
