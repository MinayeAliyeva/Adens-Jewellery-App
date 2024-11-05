import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { ICatagoryResponse } from "./models";

export const catagoryApi = createApi({
  reducerPath: "catagoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    getCategories: builder.query<ICatagoryResponse[], void>({
      query: () => `/api/catagories`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Category" as const, id: _id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    
    createCategory: builder.mutation<ICatagoryResponse[], { name: string; brand: string }>({
      query: (body) => ({
        url: "/api/catagories",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => {
        return error ? [] : [{ type: "Category", id: "LIST" }];
      },
    }),
    
    deleteCategoryById: builder.mutation<ICatagoryResponse, string>({
      query: (id) => ({
        url: `/api/catagories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => {
        return error ? [] : [{ type: "Category", id: "LIST" }];
      },
    }),

    updateCategoryById: builder.mutation<
      ICatagoryResponse,
      { name: string; id: string; brand: string }
    >({
      query: (body) => ({
        url: `/api/catagories/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => {
        return error ? [] : [{ type: "Category", id }, { type: "Category", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryByIdMutation,
  useUpdateCategoryByIdMutation,
} = catagoryApi;
