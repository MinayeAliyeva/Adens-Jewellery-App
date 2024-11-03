
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IOrderRequestArg, IOrderResponse } from "./modules";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<IOrderResponse, void>({
      query: () => `/api/orders`,
      providesTags: ["Order"],
    }),
    getOrderByUserId: builder.query<IOrderResponse, string>({
      query: (userId) => `/api/orders/user/${userId}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<IOrderResponse, IOrderRequestArg>({
      query: (body) => ({
        url: "/api/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrderById: builder.mutation<IOrderResponse, string>({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderById: builder.mutation<
      IOrderResponse,
      { name: string; id: string }
    >({
      query: (body) => ({
        url: `/api/orders/${body?.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderStatusById: builder.mutation<
      IOrderResponse,
       {orderId:string, status: string} 
    >({
      query: ({orderId, status}) => ({
        url: `/api/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeleteOrderByIdMutation,
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useUpdateOrderByIdMutation,
  useGetOrderByUserIdQuery,
  useLazyGetOrderByUserIdQuery,
  useUpdateOrderStatusByIdMutation
} = orderApi;
