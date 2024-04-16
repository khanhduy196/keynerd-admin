import { DependencyList, useEffect, useRef } from "react";

export const useUpdateEffect = (
  effect: () => void,
  dependencies: DependencyList = []
) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      return effect();
    }
  }, dependencies);
};
