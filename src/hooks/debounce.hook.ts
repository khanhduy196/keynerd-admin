import { useState } from "react";
import { useUpdateEffect } from "./update-effect.hook";

export const useDebounce = <T>(
  value: string,
  callback: () => Promise<T>,
  wait: number
) => {
  const [result, setResult] = useState<T>();
  const [isDelaying, setIsDelaying] = useState<boolean>(false);
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  const effect = () => {
    setIsDelaying(true);

    const timerId = setTimeout(async () => {
      setDebouncedValue(value);
      setIsDelaying(false);
      const res = await callback();
      setResult(res);
    }, wait);

    return () => clearTimeout(timerId);
  };

  useUpdateEffect(effect, [value]);
  return { result, isDelaying, debouncedValue };
};
