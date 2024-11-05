import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  removeFromLocalStorage,
} from "../../shared/helpers/localStorageUtil";
import { getUserFromToken } from "../../shared/helpers/authStorage";
import { IDecodedValue } from "../../shared/models";

interface AuthState {
  user: IDecodedValue | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: getLocalStorage<IDecodedValue>("user"),
  isAuthenticated: !!getLocalStorage("user"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      const decodedUser = getUserFromToken();
      state.user = decodedUser;
      state.isAuthenticated = !!decodedUser?._id;
    },
    setLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeFromLocalStorage("token");
    },
    setRegister: (state) => {
      const decodedUser = getUserFromToken();
      state.user = decodedUser;
      state.isAuthenticated = !!decodedUser?._id;
    },
    setReloadUserFromStorage: (state) => {
      const user = getLocalStorage<IDecodedValue>("user");
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { setLogin, setLogout, setRegister, setReloadUserFromStorage } =
  authSlice.actions;
