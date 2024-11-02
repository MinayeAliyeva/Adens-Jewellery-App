import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "../api/product/product-api";
import { catagoryApi } from "../api/catagory/catagory-api";
import { userApi } from "../api/user/user-api";
import { brandApi } from "../api/brand/brand-api";
import { orderApi } from "../api/order/order-api";
import { basketApi } from "../api/basket/basket-api";
import { authSlice } from "../features/authSlice";
import { basketCountSlice } from "../features/basketProductCountSlice";
import { favoriteApi } from "../api/favorite/favorite-api";
import { favoriteCountSlice } from "../features/favoriteProductCount";
import { reviewApi } from "../api/review/review-api";
import { logoApi } from "../api/logo/logo-api";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    basketProductCountReducer: basketCountSlice.reducer,
    favoriteCountReducer: favoriteCountSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [catagoryApi.reducerPath]: catagoryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [logoApi.reducerPath]: logoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      catagoryApi.middleware,
      userApi.middleware,
      brandApi.middleware,
      orderApi.middleware,
      basketApi.middleware,
      favoriteApi.middleware,
      reviewApi.middleware,
      logoApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
// Selectors
export const getUserDataSelector = (state: RootState) =>
  state.authReducer?.user;
export const getUserBasketProductCountSelector = (state: RootState) =>
  state.basketProductCountReducer?.count;
export const getUserFavoriteProductCountSelector = (state: RootState) =>
  state.favoriteCountReducer?.count;
