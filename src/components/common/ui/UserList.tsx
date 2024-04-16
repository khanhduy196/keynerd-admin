import { UserProfile } from "types/user";
import cx from "classnames";
import UserProfileCard from "./UserProfileCard";

type UserListProps = {
  userProfiles: UserProfile[];
  showText?: boolean;
  showAvatar?: boolean;
  className?: string;
  direction?: "horizontal" | "vertical";
  splitter?: React.ReactNode;
};

const UserList: React.FC<UserListProps> = ({
  userProfiles,
  showText = true,
  showAvatar,
  direction = "horizontal",
  className,
  splitter = <span>&nbsp;</span>,
}) => {
  return (
    <div
      className={cx(
        "flex justify-start flex-wrap",
        { "flex-col": direction === "vertical" },
        { "flex-row": direction === "horizontal" },
        className
      )}
    >
      {userProfiles
        .map<React.ReactNode>((userProfile, index) => (
          <UserProfileCard
            key={index}
            user={userProfile}
            showText={showText}
            showAvatar={showAvatar}
          />
        ))
        .reduce((prev, curr) => [prev, splitter, curr])}
    </div>
  );
};

export default UserList;
