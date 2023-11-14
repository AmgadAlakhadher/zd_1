import { useEffect, useState } from 'react';

export const useDependence = (inputValue: string | undefined, sendRequest: (value: string) => void) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue === debouncedValue && inputValue) {
        sendRequest(inputValue);
      }
    }, 1000); // Adjust this interval as needed

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, debouncedValue, sendRequest]);

  useEffect(() => {
    setDebouncedValue(inputValue);
  }, [inputValue]);

  return debouncedValue;
};
