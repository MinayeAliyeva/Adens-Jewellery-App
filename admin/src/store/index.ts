import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "./api/product/product-api";
import { adminApi } from "./api/admin/admin-api";
import { authSlice } from "./slice";
import { catagoryApi } from "./api/catagory/catagory-api";
import { brandApi } from "./api/brand/brand-api";

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [catagoryApi.reducerPath]: catagoryApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      adminApi.middleware,
      catagoryApi.middleware,
      brandApi.middleware
    ),
});

// Setup listeners for the query cache
setupListeners(store.dispatch);

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
