import React from 'react';
import { cn } from '@/lib/utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder,
  error,
  label,
  className,
  ...props
}) => {
  return (
    <div className='w-full'>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-100',
          'placeholder-gray-400 text-gray-900',
          'resize-vertical min-h-[80px]',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default Textarea;
