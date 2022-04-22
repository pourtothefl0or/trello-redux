import { useState, useEffect } from "react";

export const useLocalStorage = (
  initialValue: {} | [] | null,
  key: string
): [value: any, setValue: any] => {
  const getValue = () => {
    const storage = localStorage.getItem(key);

    return storage ? JSON.parse(storage) : initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
