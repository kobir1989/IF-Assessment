import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-8'>
      <Button
        variant='outline'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='w-full sm:w-auto'
      >
        <ChevronLeft className='w-4 h-4 mr-1' />
        <span>Previous</span>
      </Button>

      <div className='flex space-x-1 overflow-x-auto'>
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <Button variant='ghost' disabled className='px-2'>
                ...
              </Button>
            ) : (
              <Button
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => onPageChange(page as number)}
                className='px-2 sm:px-4'
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      <Button
        variant='outline'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='w-full sm:w-auto'
      >
        <span>Next</span>
        <ChevronRight className='w-4 h-4 ml-1' />
      </Button>
    </div>
  );
};

export default Pagination;
