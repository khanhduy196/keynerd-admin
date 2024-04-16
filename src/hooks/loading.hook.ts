import { useEffect, useState } from "react";

export const useLoading = (loadingStates: boolean[]): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(
    loadingStates.some((isLoading) => isLoading)
  );

  useEffect(() => {
    setIsLoading(loadingStates.some((isLoading) => isLoading));
  }, [loadingStates]);

  return isLoading;
};
