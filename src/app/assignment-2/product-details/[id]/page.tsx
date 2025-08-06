'use client';
import { useParams } from 'next/navigation';
import React from 'react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  return <div>ProductDetailsPage {id}</div>;
};

export default ProductDetailsPage;
