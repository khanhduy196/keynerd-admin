import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Router from "Router";

import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([{ path: "*", Component: Router }]);

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
