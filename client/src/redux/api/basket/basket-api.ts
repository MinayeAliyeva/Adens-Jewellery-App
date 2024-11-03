import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IAddBasaketBody, IBasketResponse } from "./modules";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }),

  endpoints: (builder) => ({
    getBasket: builder.query<IBasketResponse, void>({
      query: () => `/api/basket`,
    }),
    addBasket: builder.mutation<{message: string; basket:IBasketResponse}, IAddBasaketBody>({
      query: (body) => ({
        url: "/api/basket",
        method: "POST",
        body,
      }),
    }),

    getBasketByUserId: builder.query<IBasketResponse, {id:string}>({
      query: (user) => ({
        url: `/api/basket/${user.id}`,
        method: "GET",
      })
    }),

    addProductToBasket: builder.mutation<IBasketResponse, {userId: string; productId: string, quantity: number}>({
      query: ({userId, productId, quantity}) => ({
        url: `/api/basket/${userId}/${productId}`,
        method: "PUT",
        body:{quantity},
      })
    }),

    deleteProductFromBasket: builder.mutation<IBasketResponse, {userId: string; productId: string}>({
      query: ({userId, productId}) => ({
        url: `/api/basket/${userId}/${productId}`,
        method: "DELETE",
      })
    }),

    deleteAllProductFromBasket: builder.mutation<{message: string; basket:IBasketResponse}, string>({
      query: (userId) => ({
        url: `/api/basket/${userId}`,
        method: "DELETE",
      })
    }),
  }),
});

export const {
 useAddBasketMutation,
 useLazyGetBasketQuery,
 useGetBasketQuery,
 useGetBasketByUserIdQuery,
 useLazyGetBasketByUserIdQuery,
 useAddProductToBasketMutation,
 useDeleteProductFromBasketMutation,
 useDeleteAllProductFromBasketMutation
} = basketApi;