import { Button } from '@/components/ui/Button';
import { X } from 'lucide-react';
import React from 'react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className='py-4 text-left flex justify-between items-center'>
      <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
      <Button variant='ghost' size='icon' onClick={onClose}>
        <X className='w-4 h-4' />
      </Button>
    </div>
  );
};

export default ModalHeader;
