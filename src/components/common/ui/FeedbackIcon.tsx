import {
  EmployeeAnytimeFeedbackIcon,
  EmployeePeerFeedbackIcon,
  EmployeeThree60FeedbackIcon,
} from "components/icons";
import cx from "classnames";

import { FormType } from "enums/form";

type FeedbackIconProps = {
  type: FormType;
  disable?: boolean;
};

const IconMapping = {
  [FormType.THREE_HUNDRED_SIXTY]: EmployeeThree60FeedbackIcon,
  [FormType.ANYTIME]: EmployeeAnytimeFeedbackIcon,
  [FormType.PEER]: EmployeePeerFeedbackIcon,
};

const FeedbackIcon: React.FC<FeedbackIconProps> = ({ type, disable }) => {
  const Icon = IconMapping[type];

  return (
    <div
      className={cx("p-1 rounded-full", {
        "text-neutral-50 bg-neutral-20": disable,
        "text-turquoise-75 bg-turquoise-10": !disable,
      })}
    >
      <Icon />
    </div>
  );
};

export default FeedbackIcon;
