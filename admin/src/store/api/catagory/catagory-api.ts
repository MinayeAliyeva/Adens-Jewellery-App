import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { ICatagoryResponse } from "./modules";

export const catagoryApi = createApi({
  reducerPath: "catagoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    // },
  }),
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    getCategories: builder.query<ICatagoryResponse[], void>({
      query: () => `/api/catagories`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<
      ICatagoryResponse[],
      { name: string; brand: string }
    >({
      query: (body) => ({
        url: "/api/catagories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategoryById: builder.mutation<ICatagoryResponse, string>({
      query: (id) => ({
        url: `/api/catagories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategoryById: builder.mutation<
      ICatagoryResponse,
      { name: string; id: string; brand: string }
    >({
      query: (body) => ({
        url: `/api/catagories/${body?.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
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
