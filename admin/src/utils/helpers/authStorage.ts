import { getLocalStorage } from "./localStorageUtil";

interface IDecodedValue {
  isAdmin: boolean;
  _id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
};

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

export const getUserFromToken = (): IDecodedValue | null => {
  const token = getLocalStorage<string>("token");

  if (!token) {
    return null;
  }

  try {
    const decoded: IDecodedValue = decodeJWT(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
