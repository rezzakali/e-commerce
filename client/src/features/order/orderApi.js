import apiSlice from '../api/apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all orders
    getOrders: builder.query({
      query: (userId) => ({
        url: `/api/v1/orders/user-order/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
