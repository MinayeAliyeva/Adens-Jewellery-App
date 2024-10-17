import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }),
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    getBasket: builder.query<any[], void>({
      query: () => `/api/basket`,
      providesTags: ["Basket"],
    }),
    addBasket: builder.mutation<any[], any>({
      query: (body) => ({
        url: "/api/basket",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Basket"],
    }),

    getBasketByUserId: builder.query<any[], {id:string}>({
      query: (user) => ({
        url: `/api/basket/${user.id}`,
        method: "GET",
      })
    }),
  }),
});

export const {
 useAddBasketMutation,
 useLazyGetBasketQuery,
 useGetBasketQuery,
 useGetBasketByUserIdQuery,
 useLazyGetBasketByUserIdQuery
} = basketApi;
