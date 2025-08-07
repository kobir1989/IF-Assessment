'use client';

import { useGetProductByIdQuery } from '@/redux/api/productApp';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import NextImage from 'next/image';
import { Button } from '@/components/ui/Button';

const ProductDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery({ productId: id as string });

  const onBack = () => {
    router.back();
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-2 sm:px-4 py-6'>
        <div className='mb-6'>
          <Button onClick={onBack} variant='link'>
            <ArrowLeft className='w-5 h-5' />
            <span>Back to Products</span>
          </Button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8'>
          {/* Product Image */}
          <div className='space-y-4'>
            <div className='relative h-96 bg-gray-100 rounded-lg'>
              <NextImage
                src={product?.images[0] || '/default-dress.png'}
                alt={product?.title || ''}
                className='w-full h-full object-contain rounded-lg'
                width={500}
                height={500}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-800 mb-2'>{product?.title}</h1>
              {product?.category && (
                <p className='text-lg text-gray-600'>Category: {product.category.name}</p>
              )}
            </div>

            {/* Price */}
            <div className='flex items-center space-x-4'>
              <span className='text-3xl font-bold text-gray-800'>
                TK. {product?.price?.toLocaleString()}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>Description</h3>
              <p className='text-gray-600 leading-relaxed'>{product?.description}</p>
            </div>

            {/* product creation history  */}
            {product?.creationAt && (
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>Product Info</h3>
                <div className='text-sm text-gray-600 space-y-1'>
                  <p>Created: {new Date(product.creationAt).toLocaleDateString()}</p>
                  {product.updatedAt && (
                    <p>Last Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
