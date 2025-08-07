'use client';

import React, { useState } from 'react';
import ProductList from '@/components/product-app/ProductList';
import ProductListHeader from '@/components/product-app/ProductListHeader';
import SidebarFilter from '@/components/product-app/SidebarFilter';
import Pagination from '@/components/product-app/Pagination';
import { useGetProductsQuery } from '@/redux/api/productApp';
import { ITEMS_PER_PAGE } from '@/constants';
import { useProductAppStore } from '@/redux/hooks';

const ProductListPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { filters, searchKey } = useProductAppStore();

  // Calculate pagination offset
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const {
    data: productList,
    isLoading,
    error,
  } = useGetProductsQuery({
    params: {
      offset,
      limit: ITEMS_PER_PAGE,
      ...filters,
      title: searchKey,
    },
  });

  const totalPages =
    productList && productList.length < ITEMS_PER_PAGE ? currentPage : currentPage + 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='relative'>
      {/* Mobile Sidebar Overlay outside of grid*/}
      <div className='lg:hidden '>
        <SidebarFilter isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Layout Grid */}
      <div className='grid grid-cols-12 gap-4'>
        {/* Desktop Sidebar */}
        <div className='col-span-3 hidden lg:block'>
          <div className='sticky top-0 z-10 h-screen'>
            <SidebarFilter isOpen={true} onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* Main Content */}
        <div
          className='col-span-12 lg:col-span-9 bg-white rounded-lg min-h-screen lg:w-7xl lg:mx-auto'
          style={{
            width: '100%',
          }}
        >
          <div className='p-4 sticky top-0 z-10 bg-white w-full'>
            <ProductListHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>

          <div className='p-4'>
            <ProductList productList={productList || []} isLoading={isLoading} error={error} />
          </div>

          {/* Only show pagination if we have data */}
          {!isLoading && !error && productList && productList.length > 0 && (
            <div className='flex justify-center items-center my-8 pb-8'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
