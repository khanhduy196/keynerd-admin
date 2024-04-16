import { Route, Routes } from "react-router-dom";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { PAGE_PATHS } from "constants/page-paths";
import { ProtectedRoute } from "components/common";
import KeycapCreate from "pages/keycap-create/KeycapCreate";
import Home from "pages/home/Home";
import KeycapList from "pages/keycap-list/KeycapList";

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

      <Route
        path={PAGE_PATHS.KEYCAP_CREATE}
        element={
          <ProtectedRoute>
            <KeycapCreate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
