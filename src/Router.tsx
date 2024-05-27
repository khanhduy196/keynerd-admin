import { Route, Routes } from "react-router-dom";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { PAGE_PATHS } from "constants/page-paths";
import { ProtectedRoute } from "components/common";
import KeycapCreate from "pages/keycap-create/KeycapCreate";
import Home from "pages/home/Home";
import KeycapList from "pages/keycap-list/KeycapList";
import OrderList from "pages/order-list/OrderList";
import OrderCreate from "pages/order-create/OrderCreate";
import KeycapView from "pages/keycap-view/KeycapView";
import KeycapUpdate from "pages/keycap-update/KeycapUpdate";

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

      <Route
        path={PAGE_PATHS.KEYCAP_VIEW}
        element={
          <ProtectedRoute>
            <KeycapView />
          </ProtectedRoute>
        }
      />

      <Route
        path={PAGE_PATHS.KEYCAP_UPDATE}
        element={
          <ProtectedRoute>
            <KeycapUpdate />
          </ProtectedRoute>
        }
      />

      <Route
        path={PAGE_PATHS.ORDER}
        element={
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        }
      />
      <Route
        path={PAGE_PATHS.ORDER_CREATE}
        element={
          <ProtectedRoute>
            <OrderCreate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
