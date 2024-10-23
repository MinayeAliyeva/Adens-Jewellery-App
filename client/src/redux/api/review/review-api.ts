import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { IDecodedValue } from "../../../shared/modules";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }),

  tagTypes: ['Review'],  // tag tipini ekliyoruz

  endpoints: (builder) => ({
    // Ürün ID'ye göre yorumları getir
    getReviewByProductId: builder.query<any, { productId: string }>({
      query: ({ productId }) => ({
        url: `/api/reviews/${productId}`,
        method: "GET",
      }),
      providesTags: (result, error, { productId }) => 
        result ? [{ type: 'Review', id: productId }] : [],  // Cache için Review tag'i sağlar
    }),

    // Ürüne yeni yorum ekle
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
        [{ type: 'Review', id: productId }],  // Yorum eklendiğinde cache'i invalidate eder
    }),

    // Belirli bir kullanıcıdan, belirli bir ürüne ait bir yorumu sil
    deleteCommentFromReviews: builder.mutation<any, { productId: string, userId: string, commentId: string }>({
      query: ({ productId, userId, commentId }) => ({
        url: `/api/reviews/${productId}/${userId}/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => 
        [{ type: 'Review', id: productId }],  // Yorum silindiğinde cache'i invalidate eder
    }),

    // Belirli bir üründen bir kullanıcının tüm yorumlarını sil
    deleteAllCommentFromReviews: builder.mutation<any, { userId: string, productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/api/reviews/product/${productId}/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => 
        [{ type: 'Review', id: productId }],  // Tüm yorumlar silindiğinde cache'i invalidate eder
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
