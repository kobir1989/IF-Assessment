'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/product-app/ProductCard';
import Loader from '@/components/ui/Loader';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import ConfirmationModal from '@/components/ui/Modals.tsx/ConfirmationModal';
import { useRemoveProductMutation } from '@/redux/api/productApp';
import Popover from '@/components/ui/Popover';
import { ROUTES } from '@/constants';

interface ProductListProps {
  productList?: Product[];
  isLoading?: boolean;
  error?: unknown;
}

const ProductList: React.FC<ProductListProps> = ({
  productList = [],
  isLoading: productLoading = false,
  error: productError,
}) => {
  const router = useRouter();
  const [selectedProductToDelete, setSelectedProductToDelete] = useState<null | number | string>(
    null
  );
  const [removeProduct, { isLoading: deleting, error: deleteError }] = useRemoveProductMutation();
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>('');

  const handleProductClick = (productId: string | number) => {
    router.push(`${ROUTES.assignment_2.productApp.productDetails}${productId}`);
  };

  const handleEditProduct = (productId: string | number) => {
    router.push(`${ROUTES.assignment_2.productApp.manageProduct}?id=${productId}`);
  };

  const handleConfirmModal = async (productId: string | number) => {
    setSelectedProductToDelete(productId);
  };

  const handleRemoveProduct = async (productId: string | number) => {
    try {
      await removeProduct({ productId }).unwrap();
      setSelectedProductToDelete(null);
      setDeleteErrorMessage('');
    } catch (error: unknown) {
      setSelectedProductToDelete(null);
      const errorMessage = (() => {
        if (error && typeof error === 'object') {
          if (
            'data' in error &&
            typeof error.data === 'object' &&
            error.data &&
            'message' in error.data
          ) {
            return String(error.data.message) || 'Failed to delete product. Please try again.';
          }
          if ('message' in error) {
            return String(error.message) || 'Failed to delete product. Please try again.';
          }
        }
        return 'Failed to delete product. Please try again.';
      })();
      setDeleteErrorMessage(errorMessage);
    }
  };

  const handleAddProduct = () => {
    router.push(ROUTES.assignment_2.productApp.manageProduct);
  };

  if (productLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Loader />
      </div>
    );
  }

  if (productError) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <ErrorMessage
          message={
            (productError as { data?: { message?: string } })?.data?.message ||
            'Something went wrong!'
          }
          isShowActionButton={true}
        />
      </div>
    );
  }

  return (
    <div className='relative w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full'>
        {productList?.length > 0 ? (
          productList.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id.toString(),
                name: product.title,
                image: product.images?.[0] || '',
                price: product.price,
                rating: 4.5,
                reviewCount: 10,
              }}
              onProductClick={() => handleProductClick(product.id)}
              onEditProduct={() => handleEditProduct(product.id)}
              onDeleteProduct={() => handleConfirmModal?.(product.id)}
            />
          ))
        ) : (
          <div className='col-span-full flex justify-center items-center min-h-[400px]'>
            <div className='flex flex-col justify-center items-center gap-8'>
              <div className='flex flex-col justify-center items-center gap-1'>
                <h4 className='text-md font-bold text-gray-700'>No Products Found!</h4>
                <p className='text-gray-600'>Add a product to get started</p>
              </div>
              <Button variant='outline' onClick={handleAddProduct}>
                <Plus className='w-4 h-4 mr-2' />
                Add New Product
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Error popover */}
      <Popover
        message={deleteErrorMessage || 'Failed to delete product. Please try again.'}
        variant='error'
        isVisible={!!deleteError || !!deleteErrorMessage}
        onClose={() => setDeleteErrorMessage('')}
        autoClose
      />

      {/* Delete Confirmation Modal */}
      {selectedProductToDelete && (
        <ConfirmationModal
          title='Delete Product'
          message='Are you sure you want to delete this product? This action cannot be undone.'
          onClose={() => setSelectedProductToDelete(null)}
          onConfirm={() => handleRemoveProduct(selectedProductToDelete)}
          isLoading={deleting}
        />
      )}
    </div>
  );
};

export default ProductList;
