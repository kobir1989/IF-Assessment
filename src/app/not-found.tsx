import ErrorMessage from '@/components/ui/ErrorMessage';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <ErrorMessage message='Page Not Found!' isShowActionButton />
    </div>
  );
};

export default NotFoundPage;
