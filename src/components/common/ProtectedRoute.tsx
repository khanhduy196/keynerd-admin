import { PropsWithChildren } from "react";


type ProtectedRouteProps = PropsWithChildren<{ pathName?: string }>;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const user = useAuthStore((state) => state.user);
  // const location = useLocation();
  // const isAllowed = useIsAllowedAccess();

  // if (!user) {
  //   const encodedPathName = encodeURIComponent(location.pathname);

  //   return (
  //     <Navigate
  //       to={`${PAGE_PATHS.LOGIN}?redirectTo=${encodedPathName}`}
  //       replace
  //     />
  //   );
  // }

  // if (!isAllowed) return <Navigate to={PAGE_PATHS.PAGE_NOT_FOUND} replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
