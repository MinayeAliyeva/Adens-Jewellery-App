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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Brand" as const, id: _id })),
              { type: "Brand", id: "LIST" },
            ]
          : [{ type: "Brand", id: "LIST" }],
    }),

    createBrand: builder.mutation<IBrandsResponse, { name: string }>({
      query: (body) => ({
        url: "/api/brands",
        method: "POST",
        body,
      }),
      invalidatesTags: (_, error) => {
        return error ? [] : [{ type: "Brand", id: "LIST" }];
      },
    }),

    deleteBrandById: builder.mutation<IBrandsResponse, string>({
      query: (id) => ({
        url: `/api/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => {
        return error ? [] : [{ type: "Brand", id: "LIST" }];
      },
    }),

    updateBrandById: builder.mutation<IBrandsResponse, { name: string; id: string }>({
      query: (body) => ({
        url: `/api/brands/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, error, { id }) => {
        return error ? [] : [{ type: "Brand", id }, { type: "Brand", id: "LIST" }];
      },
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
