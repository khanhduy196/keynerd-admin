import { PAGE_PATHS } from "constants/page-paths";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useNumericParam = (
  paramName: string,
  leadTo404PageIfNotNumber = true
): number => {
  const { [paramName]: paramValue } = useParams();
  const numericValue = Number(paramValue);
  const navigate = useNavigate();

  useEffect(() => {
    if (!leadTo404PageIfNotNumber) return;

    if (numericValue) return;

    navigate(PAGE_PATHS.PAGE_NOT_FOUND, { replace: true });
  }, [numericValue, navigate]);

  return numericValue;
};
