'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Menu, Search } from 'lucide-react';
import { useAppDispatch, useProductAppStore } from '@/redux/hooks';
import { setSearchKey } from '@/redux/features/productAppSlice';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ROUTES } from '@/constants';

interface ProductListHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchKey } = useProductAppStore();

  const handleChange = (value: string): void => {
    dispatch(setSearchKey(value));
  };

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
          <h1 className='text-2xl font-bold hidden lg:block'>Product List </h1>
        </div>
        <div className='flex items-center space-x-4'>
          <div className='relative w-[200px] lg:w-[300px]'>
            <Input
              type='text'
              value={searchKey}
              name='search'
              onChange={(e) => handleChange(e.target.value)}
              placeholder='Search'
              id='search'
            />
            <span className='absolute right-4 top-1/2 transform -translate-y-1/2'>
              <Search className='w-4 h-4 text-gray-500' />
            </span>
          </div>

          <div className='flex items-center space-x-4'>
            <Button
              onClick={() => router.push(ROUTES.assignment_2.productApp.manageProduct)}
              className='hidden lg:flex'
            >
              <Plus className='w-4 h-4' />
              <span className='hidden lg:block'>Add Product</span>
            </Button>
          </div>
        </div>
      </div>
      <h1 className='text-md font-bold lg:hidden'>Product List</h1>
    </>
  );
};

export default ProductListHeader;
