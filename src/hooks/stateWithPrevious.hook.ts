import { Dispatch, SetStateAction, useRef, useState } from "react";

export const useStateWithPrevious = <T>(
  initialState?: T | (() => T)
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, T | undefined] => {
  const prevStateRef = useRef<T>();

  const [state, setCurrentState] = useState<T | undefined>(initialState);

  const setState: Dispatch<SetStateAction<T | undefined>> = (
    newValue: T | undefined | ((prevState: T | undefined) => T | undefined)
  ) => {
    prevStateRef.current = state;
    setCurrentState(newValue);
  };

  return [state, setState, prevStateRef.current];
};
