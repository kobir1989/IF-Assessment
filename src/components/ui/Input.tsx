import { cn } from '@/lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'default' | 'error';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'border-border focus:ring-blue-200',
      error: 'border-red-500 focus:ring-red-200',
    };

    const className = cn(
      'w-full rounded-full border px-4 text-gray-700 py-2 outline-none focus:ring-1 text-sm',
      variants[variant],
      props.className
    );

    return (
      <div className='flex flex-col gap-2'>
        {label && <label htmlFor={props?.id}>{label}</label>}
        <input type='text' className={className} {...props} ref={ref} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
