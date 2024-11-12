import { useEffect, useRef } from "react";

type Callback = () => void | (() => void);

export const useDidUpdate = (cb: Callback, dependency: unknown[]) => {
  const isInitial = useRef(true);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    cleanupRef.current = cb() || null;

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, dependency);
};
