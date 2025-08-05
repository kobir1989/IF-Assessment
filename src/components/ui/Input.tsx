import { cn } from '@/lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  const className = cn(
    'w-full rounded-full border px-8 text-gray-700 py-2 border-border outline-none focus:ring-1 focus:ring-blue-200 text-sm',
    props.className
  );
  return (
    <div className='flex flex-col gap-2'>
      {label && <label htmlFor={props?.id}>{label}</label>}
      <input type='text' className={className} {...props} ref={ref} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
