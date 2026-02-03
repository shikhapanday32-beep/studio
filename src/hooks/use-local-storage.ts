"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(() => {
    if (initialValue instanceof Function) {
      return initialValue();
    }
    return initialValue;
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            setStoredValue(JSON.parse(item));
        }
    } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
    } finally {
        setHydrated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (hydrated) {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error);
        }
    }
  }, [key, storedValue, hydrated]);

  return [storedValue, setStoredValue];
}
