import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  token?: string | null;
}
const initialState: IAuth = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getToken: (state: IAuth, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {getToken} = authSlice?.actions;
export const counterReducer = authSlice.reducer;
