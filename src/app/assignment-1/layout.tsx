import Navbar from '@/components/ui/Navbar/Navbar';
import React from 'react';

interface Assignment1LayoutProps {
  children: React.ReactNode;
}

const Assignment1Layout = ({ children }: Assignment1LayoutProps) => {
  return (
    <div className='bg-gradient-to-br from-blue-50 to-purple-50 h-screen'>
      <Navbar />
      <main className='container mx-auto w-full px-4 md:w-[1050px]'>{children}</main>
    </div>
  );
};

export default Assignment1Layout;
