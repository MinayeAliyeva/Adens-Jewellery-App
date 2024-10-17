
export const loadFromLocalStorage = <T>(key: string): T | null => {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error(`Error reading "${key}" from localStorage`, error);
      return null;
    }
  };
  
  export const saveToLocalStorage = (key: string, value: any) => {
    try {
      const serializedData = JSON.stringify(value);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error saving "${key}" to localStorage`, error);
    }
  };
  
  export const removeFromLocalStorage = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing "${key}" from localStorage`, error);
    }
  };
  