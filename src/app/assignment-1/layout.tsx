import Navbar from '@/components/ui/Navbar';
import React from 'react';

interface Assignment1LayoutProps {
  children: React.ReactNode;
}

const Assignment1Layout = ({ children }: Assignment1LayoutProps) => {
  return (
    <div className='main-h'>
      <Navbar />
      <main>
        <div className='container mx-auto'>{children}</div>
      </main>
    </div>
  );
};

export default Assignment1Layout;
