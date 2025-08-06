'use client';

import React from 'react';
import ProductCard from '@/components/product-app/ProductCard';

// TODO: need to add api here
const ProductList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 '>
      <ProductCard
        key={'test85'}
        product={{
          id: '1',
          name: 'Product 1',
          image: '',
          price: 100,
          rating: 4.5,
          reviewCount: 10,
        }}
        onProductClick={() => {}}
        onEditProduct={() => {}}
        onDeleteProduct={() => {}}
      />
    </div>
  );
};

export default ProductList;
