import React from 'react';
import { Button } from './Button';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  isShowSubmit?: boolean;
  title: string;
  onClose: () => void;
  submitButtonText?: string;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isShowSubmit,
  title,
  onClose,
  onSubmit,
  submitButtonText,
}) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-[#00000080] bg-opacity-50' onClick={onClose} />

      <div className='relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-auto'>
        {/* header */}
        <div className='px-6 py-4 text-left flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
          <Button variant='ghost' size='icon' onClick={onClose}>
            <X className='w-4 h-4' />
          </Button>
        </div>

        {/* Body */}
        <div className='px-6 py-4'>{children}</div>

        {/* Footer */}
        {isShowSubmit && (
          <div className='px-6 py-4 flex justify-end gap-3'>
            <Button onClick={onSubmit}>{submitButtonText}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
