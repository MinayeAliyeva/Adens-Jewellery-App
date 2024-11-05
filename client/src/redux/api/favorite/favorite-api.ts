import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IFavoriteResponse } from "./models";

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }),

  endpoints: (builder) => ({
    getFavoriteByUserId: builder.query<IFavoriteResponse, { userId: string }>({
      query: (user) => ({
        url: `/api/wishList/${user.userId}`,
        method: "GET",
      }),
    }),

    addProductToFavorite: builder.mutation<
      any,
      { userId: string; productId: string }
    >({
      query: (body) => ({
        url: `/api/wishList`,
        method: "POST",
        body,
      }),
    }),

    deleteProductFromFavorite: builder.mutation<
      any,
      { userId: string; productId: string }
    >({

      query: (body) => ({
        url: `/api/wishList`,
        method: "DELETE",
        body
      }),
    }),
  }),
});

export const {
  useGetFavoriteByUserIdQuery,
  useLazyGetFavoriteByUserIdQuery,
  useAddProductToFavoriteMutation,
  useDeleteProductFromFavoriteMutation
} = favoriteApi;
