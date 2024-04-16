import { PAGE_PATHS } from "constants/page-paths";

export const redirectToLoginPage = () => {
  const currentPath = window.location.pathname;
  const encodedPathName = encodeURIComponent(currentPath);

  if (currentPath !== PAGE_PATHS.LOGIN) {
    window.location.replace(
      `${PAGE_PATHS.LOGIN}?redirectTo=${encodedPathName}`
    );
  }
};
