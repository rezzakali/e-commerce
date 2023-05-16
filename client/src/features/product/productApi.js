import apiSlice from '../api/apiSlice';

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all products
    getProducts: builder.query({
      query: () => ({
        url: `/api/v1/products/get-all-products`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    // add product
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/api/v1/products/add-product`,
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['Products'],
      // pessimistic cache update start
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const response = await queryFulfilled;
      //     dispatch(
      //       apiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
      //         draft?.products?.push(response?.data?.product);
      //       })
      //     );
      //   } catch (error) {
      //     console.log(error);
      //   }
      // },
      // pessimistic cache update end
    }),

    // udpate product
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/products/update-product/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
      // pessimistic cache update start
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const response = await queryFulfilled;
      //     dispatch(
      //       apiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
      //         const product = draft?.products?.find((c) => c._id === arg.id);

      //         if (product) {
      //           const productIndex = draft?.products?.indexOf(product);
      //           draft.products[productIndex] = response?.data?.product;
      //         }
      //       })
      //     );
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
      // pessimistic cache update end
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/v1/products/delete-product/${id}`,
        method: 'DELETE',
      }),

      // optimistic cache udpate start from here
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = dispatch(
          apiSlice.util.updateQueryData('getProducts', undefined, (draft) => {
            const product = draft?.products?.find((c) => c._id === arg);
            const productIndex = draft?.products?.indexOf(product);
            if (productIndex !== -1) {
              draft.products?.splice(productIndex, 1);
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

    // get single product
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/api/v1/products/get-single-product/${id}`,
        method: 'GET',
      }),
    }),

    // product listing per page || pagination
    getPaginationProducts: builder.query({
      query: (page) => ({
        url: `/api/v1/products/get-product-list?page=${page}`,
      }),
    }),

    // get products based on their slug name
    getProductsBasedOnSlugName: builder.query({
      query: (slug) => ({
        url: `/api/v1/products/get-product/${slug}`,
      }),
    }),

    // get similar products
    getSimilarProducts: builder.query({
      query: ({ pid, cid }) => ({
        url: `/api/v1/products/get-similar-products/${pid}/${cid}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetSingleProductQuery,
  useGetPaginationProductsQuery,
  useGetProductsBasedOnSlugNameQuery,
  useGetSimilarProductsQuery,
} = productApi;

export default productApi;
