'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import ProductAddAndEditForm from '@/components/product-app/ProductAddAndEditForm';
import Loader from '@/components/ui/Loader';

const ManageProductPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-2 sm:px-4 max-w-2xl'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-xl md:text-2xl font-bold text-gray-800'>Manage Product</h1>
          <Button onClick={() => router.back()} variant='link'>
            <ArrowLeft className='w-5 h-5' />
            Back
          </Button>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <Suspense
            fallback={
              <div className='flex flex-col justify-center items-center py-12 space-y-4'>
                <Loader />
              </div>
            }
          >
            <ProductAddAndEditForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ManageProductPage;
