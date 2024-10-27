import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IDecodedValue } from "../../../shared/modules";
import { IReviewResponse } from "./modules";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }),

  tagTypes: ['Review'], 

  endpoints: (builder) => ({
    getReviewByProductId: builder.query<IReviewResponse, { productId: string }>({
      query: ({ productId }) => ({
        url: `/api/reviews/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, { productId }) => 
        result ? [{ type: 'Review', id: productId }] : [],
    }),

    addReviewToProduct: builder.mutation<
      any,
      {
        user: IDecodedValue;
        productId: string;
        comment: string;
        rating?: number;
      }
    >({
      query: (body) => ({
        url: `/api/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => 
        [{ type: 'Review', id: productId }],
    }),

    deleteCommentFromReviews: builder.mutation<IReviewResponse, { productId: string, userId: string, commentId: string }>({
      query: ({ productId, userId, commentId }) => ({
        url: `/api/reviews/${productId}/${userId}/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => 
        [{ type: 'Review', id: productId }], 
    }),

    deleteAllCommentFromReviews: builder.mutation<IReviewResponse, { userId: string, productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/api/reviews/product/${productId}/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => 
        [{ type: 'Review', id: productId }], 
    }),
  }),
});

export const {
  useGetReviewByProductIdQuery,
  useLazyGetReviewByProductIdQuery,
  useAddReviewToProductMutation,
  useDeleteCommentFromReviewsMutation,
  useDeleteAllCommentFromReviewsMutation,
} = reviewApi;
