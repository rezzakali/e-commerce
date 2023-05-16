import apiSlice from '../api/apiSlice';
import { Login } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (formData) => ({
        url: `/api/v1/auth/register`,
        method: 'POST',
        body: formData,
        formData: true,
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

    // update user information by user
    updateUserInfo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/auth/update-user-information/${id}`,
        body: data,
        method: 'PATCH',
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

    // update profile picture
    updateUserProfilePicture: builder.mutation({
      query: ({ profilePicture, id }) => ({
        url: `/api/v1/auth/update-user-profile-picture/${id}`,
        body: profilePicture,
        method: 'PATCH',
        formData: true,
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

    // fetched all users
    getAllUsers: builder.query({
      query: () => ({
        url: `/api/v1/auth/all-users`,
        method: 'GET',
      }),
    }),

    // fetched all users
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/auth/delete-user/${id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getAllUsers', undefined, (draft) => {
            const user = draft?.users?.find((u) => u._id === arg);
            const userIndex = draft?.users?.indexOf(user);
            if (userIndex !== -1) {
              draft?.users?.splice(userIndex, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          result.undo();
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useUpdateAdminMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserInfoMutation,
  useUpdateUserProfilePictureMutation,
} = authApi;
