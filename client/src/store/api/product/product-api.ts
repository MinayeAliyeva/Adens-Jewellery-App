import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IProduct } from "./modules";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getProducts: builder.query<
      IProduct,
      {
        categoryNames?: string[]; // Dizi olarak kategori alıyoruz
        productName?: string;
        min?: number;
        max?: number;
      }
    >({
      query: ({ categoryNames, productName, min, max }) => {
        const params = new URLSearchParams();

        // Kategori isimleri dizi olarak geldiği için tüm elemanları ekliyoruz
        if (categoryNames && categoryNames.length > 0) {
          categoryNames.forEach((category) => params.append("categoryName", category));
        }
        if (productName) params.append("productName", productName);
        if (min !== undefined) params.append("min", min.toString());
        if (max !== undefined) params.append("max", max.toString());

        return `/api/products?${params.toString()}`;
      },
    }),
    getProducDetailById: builder.query<IProduct, string>({
      query: (id) => `/api/products/${id}`,
    }),
  }),
});


export const {
  useLazyGetProductsQuery,
  useGetProductsQuery,
  useGetProducDetailByIdQuery,
} = productApi;
