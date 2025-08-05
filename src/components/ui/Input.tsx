import { cn } from '@/lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: InputProps) => {
  const className = cn(
    'w-full rounded-full border px-8 text-gray-700 py-2 border-border outline-none focus:ring-1 focus:ring-gray-300 text-sm',
    props.className
  );
  return (
    <div className='flex flex-col gap-2'>
      {label && <label htmlFor={props?.id}>{label}</label>}
      <input type='text' className={className} {...props} />
    </div>
  );
};

export default Input;
