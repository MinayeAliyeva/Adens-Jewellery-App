import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
// import { IOrderRequest, IOrderResponse } from "./modules";

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
    // deleteOrderById: builder.mutation<IOrderResponse, string>({
    //   query: (id) => ({
    //     url: `/api/orders/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Order"],
    // }),
    // updateOrderById: builder.mutation<
    //   IOrderResponse,
    //   { name: string; id: string }
    // >({
    //   query: (body) => ({
    //     url: `/api/orders/${body?.id}`,
    //     method: "PUT",
    //     body,
    //   }),
    //   invalidatesTags: ["Order"],
    // }),
  }),
});

export const {
 useAddBasketMutation,
 useLazyGetBasketQuery,
 useGetBasketQuery
} = basketApi;
