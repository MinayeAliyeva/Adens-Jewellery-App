import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IBrandsResponse } from "./modules";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    // },
  }),

  endpoints: (builder) => ({
    // Tüm markaları getir
    getBrands: builder.query<IBrandsResponse[], void>({
      query: () => `/api/brands`,
    }),

    createBrand: builder.mutation<IBrandsResponse, { name: string }>({
      query: (body) => ({
        url: "/api/brands",
        method: "POST",
        body,
      }),
    }),

    deleteBrandById: builder.mutation<IBrandsResponse, string>({
      query: (id) => ({
        url: `/api/brands/${id}`,
        method: "DELETE",
      }),
    }),

    updateBrandById: builder.mutation<IBrandsResponse, { name: string; id: string }>({
      query: (body) => ({
        url: `/api/brands/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery, 
  useLazyGetBrandsQuery, 
  useCreateBrandMutation, 
  useDeleteBrandByIdMutation, 
  useUpdateBrandByIdMutation, 
} = brandApi;
