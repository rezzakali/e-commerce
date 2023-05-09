import apiSlice from '../api/apiSlice';

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all categories
    getCategories: builder.query({
      query: () => ({
        url: `/api/v1/category/categories`,
        method: 'GET',
      }),
    }),

    // add category
    addCategory: builder.mutation({
      query: (data) => ({
        url: `/api/v1/category/create-category`,
        method: 'POST',
        body: { data },
      }),

      // pessimistic cache update start
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getCategories',
              undefined,
              (draft) => {
                draft?.categories?.push(response?.data?.newCategory);
              }
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
      // pessimistic cache update end
    }),

    // edit category
    editCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/category/update-category/${id}`,
        method: 'PUT',
        body: { data },
      }),

      // pessimistic cache update start
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              'getCategories',
              undefined,
              (draft) => {
                const category = draft?.categories?.find(
                  (c) => c._id === arg.id
                );

                if (category) {
                  const categoryIndex = draft?.categories?.indexOf(category);
                  draft.categories[categoryIndex] = response?.data?.category;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
      // pessimistic cache update end
    }),

    // delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/v1/category/delete-category/${id}`,
        method: 'DELETE',
      }),

      // optimistic cache udpate start from here
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getCategories', undefined, (draft) => {
            const category = draft?.categories?.find((c) => c._id === arg);

            const categoryIndex = draft?.categories?.indexOf(category);

            if (categoryIndex !== -1) {
              draft.categories?.splice(categoryIndex, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          result.undo();
        }
      },
      // optimistic cache udpate end from here
    }),

    // get category name
    getCategoryName: builder.query({
      query: (cid) => ({
        url: `/api/v1/category/get-single-category/${cid}`,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryNameQuery,
} = categoryApi;
