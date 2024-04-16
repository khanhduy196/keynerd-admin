import { useCallback, useEffect, useMemo, useState } from "react";

export const useInViewport = <T extends Element>() => {
  const [target, setTarget] = useState<T | null>();
  const [isInViewPort, setIsInViewPort] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsInViewPort(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    if (!target || !observer) return;

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      setIsInViewPort(false);
    };
  }, [target]);

  const targetRef = useCallback((node: T | null) => {
    setTarget(node);
  }, []);

  return { targetRef, isInViewPort };
};
