import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),

    getSignleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),

    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),

    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
      keepUnusedDataFor: 10,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSignleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = api;
