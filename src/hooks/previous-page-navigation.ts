import { PAGE_PATHS } from "constants/page-paths";
import { useNavigate } from "react-router-dom";

export const usePreviousPageNavigation = () => {
  const navigate = useNavigate();
  const navigateToPreviousPage = () => {
    if (window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(PAGE_PATHS.HOME);
    }
  };
  return {
    navigateToPreviousPage,
  };
};
