import apiSlice from '../api/apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all orders of individual users
    getOrders: builder.query({
      query: (userId) => ({
        url: `/api/v1/orders/user-order/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    // get all orders for admin dashboad
    getAllOrders: builder.query({
      query: () => ({
        url: `/api/v1/orders/all-orders`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    // order status change
    orderStatusChange: builder.mutation({
      query: ({ statusText, userId, id }) => ({
        url: `/api/v1/orders/update-order-status/${id}`,
        method: 'PATCH',
        body: {
          statusText,
          userId,
        },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useOrderStatusChangeMutation,
} = orderApi;
