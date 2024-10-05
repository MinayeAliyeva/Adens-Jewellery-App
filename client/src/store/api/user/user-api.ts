import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}), 
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, any>({
      query: (userData) => ({
        url: `/api/users/register`,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
} = userApi;
