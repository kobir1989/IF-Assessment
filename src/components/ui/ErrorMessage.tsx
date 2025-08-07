'use client';

import { Button } from '@/components/ui/Button';
import React from 'react';
import { RefreshCcw, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorMessageProps {
  message: string;
  isShowActionButton?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isShowActionButton = false }) => {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='text-center flex flex-col justify-center items-center'>
      <h4 className='text-lg font-bold text-red-500'>Opps!</h4>
      <p className='text-lg text-red-500'>{message}</p>
      {isShowActionButton && (
        <div className='mt-6 flex gap-2'>
          <Button variant='outline' onClick={handleRefresh}>
            <RefreshCcw />
            Refresh
          </Button>
          <Button variant='outline' onClick={handleGoBack}>
            <ArrowLeft />
            Go back
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
