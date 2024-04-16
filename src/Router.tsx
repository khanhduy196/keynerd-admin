import { Route, Routes } from "react-router-dom";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { PAGE_PATHS } from "constants/page-paths";
import { Home, KeycapList } from "pages";
import { ProtectedRoute } from "components/common";

const Router = () => {
  return (
    <Routes>
      <Route
        path={PAGE_PATHS.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path={PAGE_PATHS.KEYCAP}
        element={
          <ProtectedRoute>
            <KeycapList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
