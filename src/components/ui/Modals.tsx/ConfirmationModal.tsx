import { Button } from '@/components/ui/Button';
import ModalHeader from '@/components/ui/Modals.tsx/ModalHeader';
import ModalWrapper from '@/components/ui/Modals.tsx/ModalWrapper';
import React from 'react';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  onClose,
  message,
  onConfirm,
  isLoading,
}) => {
  return (
    <ModalWrapper>
      <div className='relative bg-white rounded-lg shadow-lg max-w-sm w-full mx-4 max-h-[90vh] overflow-auto'>
        <ModalHeader title={title} onClose={onClose} />
        <div className='flex justify-start items-center text-sm text-gray-600 p-4'>
          <p>{message}</p>
        </div>
        <div className='flex justify-end items-end mt-2 px-4 pb-4'>
          <Button variant='destructive' disabled={isLoading} onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
