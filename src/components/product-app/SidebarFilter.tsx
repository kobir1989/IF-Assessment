'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// TODO: need to add category and price filter list
const SidebarFilter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed top-16 left-0 right-0 bottom-0 bg-[#00000080] bg-opacity-50 z-30 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        p-6 bg-white lg:rounded-lg shadow-md flex flex-col text-left
        lg:relative lg:translate-x-0 lg:shadow-md lg:w-full lg:h-screen
        fixed top-16 lg:top-0 left-0 bottom-0 z-40 w-80 transition-transform duration-300 ease-in-out lg:transition-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}
      >
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-2'>
            <Filter className='w-5 h-5' />
            <h3 className='text-lg font-semibold'>Filter</h3>
          </div>
          <Button
            variant='ghost'
            onClick={onClose}
            className='lg:hidden text-gray-500 hover:text-gray-700 text-2xl'
          >
            <X className='w-5 h-5' />
          </Button>
        </div>

        <div className='space-y-6'>
          {/* Brand */}
          <div>
            <h4 className='font-semibold mb-3'>Brand</h4>
            <div className='space-y-2'>
              <label className='flex items-center space-x-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={true}
                  className='w-5 h-5 rounded border-gray-300 accent-black cursor-pointer'
                />
                <span className='text-sm text-gray-700'>Brand</span>
              </label>
            </div>
          </div>

          {/* Price */}
          <div>
            <h4 className='font-semibold mb-3'>Price</h4>
            <div className='space-y-2'>
              <label className='flex items-center space-x-2 cursor-pointer'>
                <input
                  type='radio'
                  name='priceRange'
                  checked={true}
                  className='w-5 h-5 accent-black cursor-pointer'
                />
                <span className='text-sm text-gray-700'>TK.1000</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
