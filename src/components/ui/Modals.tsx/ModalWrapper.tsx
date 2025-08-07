import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  children: ReactNode;
  onClose?: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-[#00000080] backdrop-blur-sm bg-opacity-50'
        onClick={onClose}
      />
      {children}
    </div>
  );
};

export default ModalWrapper;
