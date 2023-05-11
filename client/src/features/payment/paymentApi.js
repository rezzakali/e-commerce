import apiSlice from '../api/apiSlice';

const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: ({ cartItems, userId }) => ({
        url: `/api/v1/payment/create-checkout-session`,
        method: 'POST',
        body: {
          cartItems,
          userId,
        },
      }),
    }),
  }),
});

export const { usePaymentMutation } = paymentApi;
