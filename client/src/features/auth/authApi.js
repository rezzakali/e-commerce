import apiSlice from '../api/apiSlice';
import { Login } from './authSlice';

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
        body: { data },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: response?.data?.token,
              user: response?.data?.user,
            })
          );

          dispatch(
            Login({
              accessToken: response?.data?.token,
              user: response?.data?.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/forgot-password`,
        method: 'POST',
        body: {
          data,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
} = authApi;
