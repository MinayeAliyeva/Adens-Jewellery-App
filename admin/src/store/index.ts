import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./api/product/product-api";
import { adminApi } from "./api/admin/admin-api";
import { authSlice } from "./slice";
import { catagoryApi } from "./api/catagory/catagory-api";
import { brandApi } from "./api/brand/brand-api";
import { usersApi } from "./api/users/users-api";
import { basketApi } from "./api/basket/basket-api";
import { settingApi } from "./api/setting/setting-api";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [catagoryApi.reducerPath]: catagoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [settingApi.reducerPath]: settingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      adminApi.middleware,
      catagoryApi.middleware,
      brandApi.middleware,
      usersApi.middleware,
      basketApi.middleware,
      settingApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
