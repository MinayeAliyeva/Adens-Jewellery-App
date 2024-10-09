import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./api/product/product-api";
import { catagoryApi } from "./api/catagory/catagory-api";
import { userApi } from "./api/user/user-api";
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [catagoryApi.reducerPath]: catagoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      catagoryApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);
