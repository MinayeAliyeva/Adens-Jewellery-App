import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { RootState } from "../../index"; // Correctly import your RootState type
import { prepareHeaders } from "../prepareHeader";

export interface IUser {
  firstName: string;
  lastName: string;
  phone?: string; // Optional
  email: string;
  password: string;
  profile?: string; // Optional
  isAdmin?: boolean; // Optional
  createdAt?: Date; // Provided by timestamps
  updatedAt?: Date; // Provided by timestamps
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}` || ''
    },
    responseHandler: (response) => response.text(),
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    getAdminLogin: builder.query<string , {email: string, password: string}>({
        query: (adminData) => ({
            url: `/api/users/auth`,
            method: 'POST',
            body: adminData,
          }),
    }),
  }),
});

export const { useGetAdminLoginQuery, useLazyGetAdminLoginQuery } = adminApi; // Export your hooks
