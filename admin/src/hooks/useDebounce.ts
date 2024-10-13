import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearInterval(timeOutId);
  }, [value, delay]);
  return debouncedValue;
};
