import { useState, useEffect } from "react";

// 디바운싱 커스텀 훅 
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue ] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
