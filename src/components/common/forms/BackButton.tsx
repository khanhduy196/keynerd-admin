import Button from "./Button";
import { BackIcon } from "components/icons";
import cx from "classnames";

import { usePreviousPageNavigation } from "hooks/previous-page-navigation";

type BackButtonProps = {
  className?: string;
};

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const { navigateToPreviousPage } = usePreviousPageNavigation();
  const handleGoBack = () => {
    navigateToPreviousPage();
  };

  return (
    <Button
      onClick={handleGoBack}
      className={cx(
        "flex justify-center items-center !p-0 !w-10 !h-10",
        className
      )}
      variant="secondary"
    >
      <BackIcon className="w-6 h-6" />
    </Button>
  );
};

export default BackButton;
