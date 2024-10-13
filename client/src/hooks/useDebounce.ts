import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    let timeOutId: any = null;
    if(value  && value?.length > 0){
      timeOutId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }

    return () => clearInterval(timeOutId);
  }, [value, delay]);
  return debouncedValue;
};