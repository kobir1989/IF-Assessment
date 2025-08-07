import React from 'react';

import ModalHeader from '@/components/ui/Modals.tsx/ModalHeader';
import { Button } from '@/components/ui/Button';
import ModalWrapper from '@/components/ui/Modals.tsx/ModalWrapper';

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
    <ModalWrapper>
      <div className='relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-auto'>
        {/* header */}
        <ModalHeader title={title} onClose={onClose} />

        {/* Body */}
        <div className='p-4 py-6'>{children}</div>

        {/* Footer */}
        {isShowSubmit && (
          <div className='px-6 py-4 flex justify-end gap-3'>
            <Button onClick={onSubmit}>{submitButtonText}</Button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

export default Modal;
