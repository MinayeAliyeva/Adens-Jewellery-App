import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "./modules";
import { BASE_URL } from "../constants";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin-token");

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },  
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `/api/products`,
    }),
    addProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api/products",
        method: "POST",
        body,
      }),
    }),

    deleteProductById: builder.mutation<string, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
    }),
    updateProductById: builder.mutation<
      IProduct,
      { id: string; body: any }
    >({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetProductsQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
} = productApi;
