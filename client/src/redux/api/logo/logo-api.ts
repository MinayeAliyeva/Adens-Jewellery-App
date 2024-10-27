import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { ILogoResponse } from "./modules";

export const logoApi = createApi({
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
  }),
});

export const { useGetLogoQuery } = logoApi;
