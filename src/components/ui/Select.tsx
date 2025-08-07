import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const selectVariants = cva(
  'w-full px-3 py-2 border rounded-full outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-gray-400',
        error: 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500',
      },
      size: {
        default: 'h-10 text-sm',
        sm: 'h-8 text-xs',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  onChange?: (value: string | number) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options = [],
      placeholder,
      error,
      variant,
      size,
      className,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const selectVariant = error ? 'error' : variant;

    return (
      <div className='w-full flex flex-col gap-2'>
        {label && (
          <label htmlFor={props.id} className='block text-sm font-medium text-gray-700'>
            {label}
          </label>
        )}
        <select
          ref={ref}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value as string | number)}
          className={cn(selectVariants({ variant: selectVariant, size, className }))}
          {...props}
        >
          {placeholder && (
            <option value='' disabled={props.required}>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
