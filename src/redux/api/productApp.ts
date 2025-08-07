import {
  Product,
  GetProductsRequest,
  ProductByIdParams,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
} from '@/types';
import { apiSlice } from './apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsRequest>({
      query: ({ params }) => ({
        url: '/products',
        params,
      }),
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, ProductByIdParams>({
      query: ({ params, productId }) => ({
        url: `/products/${productId}`,
        params,
      }),
    }),
    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: ({ body, params }) => ({
        url: '/products',
        method: 'POST',
        body,
        params,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ body, productId }) => ({
        url: `/products/${productId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    removeProduct: builder.mutation<{ message: string }, DeleteProductRequest>({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    getProductCategory: builder.query({
      query: () => ({
        url: '/categories',
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useGetProductCategoryQuery,
} = productApi;
