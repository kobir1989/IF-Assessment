import Navbar from '@/components/ui/Navbar/Navbar';
import React from 'react';

interface Assignment2LayoutProps {
  children: React.ReactNode;
}

const Assignment2Layout = ({ children }: Assignment2LayoutProps) => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <header>
        <Navbar />
      </header>
      <main>
        <div className='container mx-auto max-w-7xl px-4 py-6 '>{children}</div>
      </main>
    </div>
  );
};

export default Assignment2Layout;
