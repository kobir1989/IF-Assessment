'use client';

import React, { useState } from 'react';
import ProductList from '@/components/product-app/ProductList';
import ProductListHeader from '@/components/product-app/ProductListHeader';
import SidebarFilter from '@/components/product-app/SidebarFilter';
import Pagination from '@/components/product-app/Pagination';

const ProductListPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <div className='col-span-12 lg:col-span-9 bg-white rounded-lg min-h-screen lg:max-w-7xl lg:mx-auto'>
          <div className='p-4 sticky top-0 z-10 '>
            <ProductListHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>
          <div className='p-4'>
            <ProductList />
          </div>
          <div className='flex justify-center items-center my-4'>
            <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
