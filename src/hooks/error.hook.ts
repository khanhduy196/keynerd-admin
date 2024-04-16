import axios from "axios";
import { PAGE_PATHS } from "constants/page-paths";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastError } from "utils/toast";

export const useError = (error: unknown, leadToErrorPage?: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data.message;

      if (errorMsg) {
        toastError(errorMsg);
      }
    }

    if (leadToErrorPage) {
      navigate(PAGE_PATHS.PAGE_NOT_FOUND, { replace: true });
    }
  }, [error, navigate]);
};
