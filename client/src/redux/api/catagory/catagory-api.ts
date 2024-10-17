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

  endpoints: (builder) => ({
    getCategories: builder.query<ICatagoryResponse[], void>({
      query: () => `/api/catagories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = catagoryApi;
