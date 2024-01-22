import { api } from '@/redux/api/apiSlice';

const productAPI = api.injectEndpoints({
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
} = productAPI;
