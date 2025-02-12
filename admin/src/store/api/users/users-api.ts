import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IUser } from "./models";

export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => `/api/users`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
