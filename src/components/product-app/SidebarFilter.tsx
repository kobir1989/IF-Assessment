'use client';

import React from 'react';
import { Filter, X, FunnelX } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useGetProductCategoryQuery } from '@/redux/api/productApp';
import { useAppDispatch, useProductAppStore } from '@/redux/hooks';
import { toggleCategoryFilter, clearFilters } from '@/redux/features/productAppSlice';
import { Category } from '@/types';

interface SidebarFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { filters } = useProductAppStore();
  const { data: categoryList } = useGetProductCategoryQuery({});

  const handleCategoryChange = (categoryId: number): void => {
    dispatch(toggleCategoryFilter(categoryId));
  };

  const handleClearFilters = (): void => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = () => filters.category.length > 0;

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
        p-6 bg-white lg:rounded-lg shadow-md flex flex-col text-left overflow-y-scroll
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

        <div className='space-y-6 flex-1'>
          {/* Category Filter */}
          <div>
            <h4 className='font-semibold mb-3'>Category</h4>
            <div className='space-y-2'>
              {categoryList?.map((category: Category) => (
                <label key={category.id} className='flex items-center space-x-2 cursor-pointer'>
                  <input
                    name={category?.name}
                    id={category?.name}
                    type='checkbox'
                    checked={filters.category.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className='w-5 h-5 rounded border-gray-300 accent-black cursor-pointer'
                  />
                  <span className='text-sm text-gray-700'>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {hasActiveFilters() && (
            <div>
              <Button variant='outline' onClick={() => handleClearFilters()}>
                <FunnelX /> Clear Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
