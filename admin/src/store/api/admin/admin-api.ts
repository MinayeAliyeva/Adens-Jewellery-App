import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export interface IUser {
  firstName: string;
  lastName: string;
  phone?: string; 
  email: string;
  password: string;
  profile?: string; 
  isAdmin?: boolean;
  createdAt?: Date; 
  updatedAt?: Date; 
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` || ''
    },
    responseHandler: (response) => response.text(),
  }),
  endpoints: (builder) => ({
    getAdminLogin: builder.query<string , {email: string, password: string}>({
        query: (credential) => ({
            url: `/api/users/auth`,
            method: 'POST',
            body: credential,
          }),
    }),
  }),
});

export const { useGetAdminLoginQuery, useLazyGetAdminLoginQuery } = adminApi;
