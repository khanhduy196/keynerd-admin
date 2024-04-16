import { useEffect, useRef } from "react";

const EVENT_NAME = "mousedown";

export const useOutsideClick = <T extends Element>(callback: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;

      callback();
    };

    document.addEventListener(EVENT_NAME, handleClickOutside);

    return () => document.removeEventListener(EVENT_NAME, handleClickOutside);
  }, [callback]);

  return ref;
};
