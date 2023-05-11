import apiSlice from '../api/apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (userId) => ({
        url: `/api/v1/orders/user-order/${userId}`,
      }),
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;
