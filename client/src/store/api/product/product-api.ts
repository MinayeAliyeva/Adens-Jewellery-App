import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IProduct } from "./modules";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getProducts: builder.query<
      IProduct[],
      {
        categoryNames?: string[]; // Dizi olarak kategori alıyoruz
        brand?: string[];
        productName?: string;
        min?: number;
        max?: number;
        size?: string[];
        weight?: number;
        duration?: number;
        dimention?: number;
      }
    >({
      query: ({
        categoryNames,
        productName,
        min,
        max,
        size,
        brand,
        weight,
        duration,
        dimention,
      }) => {
        const params = new URLSearchParams();

        if (categoryNames && categoryNames.length > 0) {
          categoryNames.forEach((category) =>
            params.append("category", category)
          );
        }
        if (brand && brand.length > 0) {
          brand.forEach((brand) => params.append("brand", brand));
        }
        if (size && size.length > 0) {
          size.forEach((size) => params.append("size", size));
        }
        if (productName) params.append("productName", productName);
        if (min !== undefined) params.append("min", min.toString());
        if (max !== undefined) params.append("max", max.toString());
        if (weight !== undefined) params.append("weight", weight.toString());
        if (duration !== undefined)
          params.append("duration", duration.toString());
        if (dimention !== undefined)
          params.append("dimention", dimention.toString());

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
