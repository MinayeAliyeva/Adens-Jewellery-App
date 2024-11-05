import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IBrandsResponse } from "./models";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    // },
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query<IBrandsResponse[], void>({
      query: () => `/api/brands`,
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation<IBrandsResponse[], { name: string }>({
      query: (body) => ({
        url: "/api/brands",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrandById: builder.mutation<IBrandsResponse, string>({
      query: (id) => ({
        url: `/api/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrandById: builder.mutation<
      IBrandsResponse,
      { name: string; id: string }
    >({
      query: (body) => ({
        url: `/api/brands/${body?.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Brand"],
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
