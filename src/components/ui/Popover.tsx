'use client';

import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const popoverVariants = cva(
  'fixed bottom-4 right-4 z-50 min-w-[300px] max-w-[400px] p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out transform',
  {
    variants: {
      variant: {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
      },
      state: {
        visible: 'translate-y-0 opacity-100',
        hidden: 'translate-y-full opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'success',
      state: 'hidden',
    },
  }
);

export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const Popover: React.FC<PopoverProps> = ({
  message,
  isVisible,
  variant = 'success',
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
}) => {
  const [isShown, setIsShown] = useState(isVisible);

  useEffect(() => {
    setIsShown(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (isShown && autoClose) {
      const timer = setTimeout(() => {
        setIsShown(false);
        onClose?.();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isShown, autoClose, autoCloseDelay, onClose]);

  const handleClose = () => {
    setIsShown(false);
    onClose?.();
  };

  const Icon = variant === 'success' ? CheckCircle : AlertCircle;

  return (
    <div
      className={cn(
        popoverVariants({
          variant,
          state: isShown ? 'visible' : 'hidden',
        })
      )}
    >
      <div className='flex items-start gap-3'>
        <Icon className='w-5 h-5 mt-0.5 flex-shrink-0' />
        <div className='flex-1'>
          <p className='text-sm font-medium'>{message}</p>
        </div>
        <button
          onClick={handleClose}
          className='flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors'
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
};

export default Popover;
