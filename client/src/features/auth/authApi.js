import apiSlice from '../api/apiSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/register`,
        method: 'POST',
        body: {
          data,
        },
      }),
    }),

    // login
    login: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
