export const decodeJWT = (token: string) => {
  try {
    const base64Url = token?.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);

    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
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
