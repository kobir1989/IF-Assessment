'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Menu, Search } from 'lucide-react';
import Input from '../ui/Input';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductListHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const router = useRouter();
  return (
    <>
      <div className='flex justify-between gap-4 mb-6'>
        <div className='flex items-center space-x-2 w-full'>
          <Button
            variant='outline'
            className='lg:hidden'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className='w-4 h-4' />
          </Button>
          <h1 className='text-2xl font-bold hidden lg:block'>Product List 20</h1>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='relative w-[200px] lg:w-[300px]'>
            <Input type='text' name='search' placeholder='Search' id='search' />
            <span className='absolute right-4 top-1/2 transform -translate-y-1/2'>
              <Search className='w-4 h-4 text-gray-500' />
            </span>
          </div>

          <div className='flex items-center space-x-4'>
            <Button
              onClick={() => router.push('/assignment-2/manage-product')}
              className='hidden lg:flex'
            >
              <Plus className='w-4 h-4' />
              <span className='hidden lg:block'>Add Product</span>
            </Button>
          </div>
        </div>
      </div>
      <h1 className='text-md font-bold lg:hidden'>Product List (20)</h1>
    </>
  );
};

export default ProductListHeader;
