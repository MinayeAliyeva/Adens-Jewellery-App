import { jwtDecode } from "jwt-decode";
import { loadFromLocalStorage } from "./localStorageUtil";

interface IDecodedValue {
  isAdmin: boolean;
  _id: string;
  name: string;
  phone?: string;
  email: string;
}

export const getUserFromToken = (): IDecodedValue | null => {
  const token = loadFromLocalStorage<string>("token");

  if (!token) {
    return null;
  }

  try {
    const decoded: IDecodedValue = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
