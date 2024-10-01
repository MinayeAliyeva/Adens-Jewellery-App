import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "./modules";
import { BASE_URL } from "../constants";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL 
}),
  
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `/api/products`,
    }),
    addProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: '/api/products',
        method: 'POST',
        body,
        
      }),
    }),
  }),
});

export const { useLazyGetProductsQuery, useGetProductsQuery, useAddProductMutation } = productApi;
