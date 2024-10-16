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
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query<IBrandsResponse[], void>({
      query: () => `/api/brands`,
      providesTags: (result) => 
        result 
          ? result.map(({ _id }) => ({ type: "Brand", _id })) 
          : ["Brand"],
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
      invalidatesTags: (result, error, id) => [{ type: "Brand", id }],
    }),
    updateBrandById: builder.mutation<IBrandsResponse, { name: string; id: string }>({
      query: (body) => ({
        url: `/api/brands/${body?.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Brand", id }],
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
