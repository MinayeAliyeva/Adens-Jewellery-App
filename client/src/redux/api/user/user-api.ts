import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { saveToLocalStorage } from "../../../shared/helpers/localStorageUtil";
import { useDispatch } from "react-redux";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    responseHandler: (response) => response.text(),
    prepareHeaders: (headers) => {
      // Eğer localStorage'da bir token varsa, sonraki isteklerde header'a ekleyin
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: `/api/users/register`,
        method: 'POST',
        body: userData,
      }),
      extraOptions: {
        meta: true,
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { meta } = await queryFulfilled;
          let token = meta?.response?.headers.get('Authorization');
            
          if (token) {
            if (token.startsWith("Bearer ")) {
              token = token.slice(7, token.length).trim();
            }
            saveToLocalStorage('token', token);
          }
        } catch (err) {
          console.error('Error fetching token:', err);
        }
      },
    }),
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: `/api/users/auth`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;
