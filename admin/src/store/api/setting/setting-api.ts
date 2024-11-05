import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { ILogoResponse } from "./models";

export const settingApi = createApi({
  reducerPath: "settingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Logo"], 

  endpoints: (builder) => ({
    getLogo: builder.query<ILogoResponse[], void>({
      query: () => `/api/settings/logo`,
      providesTags: ["Logo"],  
    }),

    createLogo: builder.mutation<ILogoResponse, FormData>({
      query: (formData) => ({
        url: "/api/settings/logo",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Logo"], 
    }),

    updateLogo: builder.mutation<ILogoResponse, {logoId: string}>({
      query: ({logoId}) => ({
        url: `/api/settings/logo/${logoId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Logo"], 
    }),

    deleteLogo: builder.mutation<ILogoResponse, {logoId: string}>({
      query: ({logoId}) => ({
        url: `/api/settings/logo/${logoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logo"], 
    }),
  }),
});

export const {
  useGetLogoQuery,
  useCreateLogoMutation,
  useUpdateLogoMutation,
  useDeleteLogoMutation,
} = settingApi;
