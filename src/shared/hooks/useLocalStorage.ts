import { useState, useEffect } from 'react';

const dispatchStorageEvent = (key: string, newValue: any) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
  window.dispatchEvent(new CustomEvent("local-storage", { detail: { key, newValue } }));
};

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        const jsonValue = JSON.stringify(valueToStore);
        window.localStorage.setItem(key, jsonValue);
        dispatchStorageEvent(key, jsonValue);
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());

    const handleStorageChange = (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent).key === key || (event as CustomEvent).detail?.key === key) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorageChange as EventListener);
    window.addEventListener('local-storage', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange as EventListener);
      window.removeEventListener('local-storage', handleStorageChange as EventListener);
    };
  }, [key]);

  return [storedValue, setValue];
}
