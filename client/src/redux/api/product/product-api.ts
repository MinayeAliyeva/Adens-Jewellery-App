import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IProduct, IProductDetailResponse } from "./modules";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getProducts: builder.query<
      IProduct[],
      string
    >({
      query: (params) => `/api/products?${params}`
    }),
    getProducDetailById: builder.query<IProductDetailResponse, string>({
      query: (id) => `/api/products/${id}`,
    }),
  }),
});

export const {
  useLazyGetProductsQuery,
  useGetProductsQuery,
  useGetProducDetailByIdQuery,
} = productApi;
