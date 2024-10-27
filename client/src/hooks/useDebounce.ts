import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    let timeOutId: any = null;

    timeOutId = setTimeout(() => {
      setDebouncedValue(value?.toString().trim());
    }, delay);

    return () => clearInterval(timeOutId);
  }, [value, delay]);
  return debouncedValue;
};
