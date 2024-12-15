import { useState } from 'react';

// Хук для работы с localStorage или sessionStorage
function useStorage(key, initialValue, storageType = 'localStorage') {
  const storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;

  // Функция для получения значения из хранилища
  const getStoredValue = () => {
    const storedValue = storage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return initialValue;
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Функция для обновления значения в хранилище
  const setValue = (value) => {
    setStoredValue(value);
    storage.setItem(key, JSON.stringify(value));
  };

  // Функция для удаления значения из хранилища
  const removeValue = () => {
    setStoredValue(null);
    storage.removeItem(key);
  };

  return [storedValue, setValue, removeValue];
}

export default useStorage;
