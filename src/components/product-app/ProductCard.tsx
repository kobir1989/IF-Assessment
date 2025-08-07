'use client';

import React, { useState } from 'react';
import { Edit, Star, Trash } from 'lucide-react';
import { Button } from '../ui/Button';
import NextImage from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
}

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group border border-gray-200'>
      <div className='relative h-48 bg-gray-100'>
        <NextImage
          src={imageError || !product?.image ? '/default-dress.png' : product.image}
          alt={product.name}
          className='w-full h-full object-contain rounded-t-lg cursor-pointer'
          onClick={() => onProductClick(product)}
          width={300}
          height={200}
          onError={handleImageError}
        />
      </div>

      <div className='p-4'>
        <h3
          className='font-semibold text-gray-800 mb-2 cursor-pointer hover:text-blue-600 transition-colors'
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        <div className='flex items-center mb-2'>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className='text-sm text-gray-600 ml-1'>({product.reviewCount})</span>
        </div>

        <div className='flex items-center justify-between mb-4'>
          <div>
            <span className='text-lg font-bold text-gray-800'>
              TK.{product.price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => onEditProduct(product)}>
            <Edit className='w-4 h-4 mr-1' />
          </Button>
          <Button variant='destructive' onClick={() => onDeleteProduct(product)}>
            <Trash className='w-4 h-4 mr-1' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
