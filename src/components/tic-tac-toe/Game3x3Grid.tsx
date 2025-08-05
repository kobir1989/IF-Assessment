import React from 'react';
import { PLAYER_X } from '@/constants';

interface Game3x3GridProps {
  board: string[];
  winner: string | null;
  isGameSeriesOver: boolean;
  handleCellClick: (index: number) => void;
}

const Game3x3Grid: React.FC<Game3x3GridProps> = ({
  board = [],
  winner,
  isGameSeriesOver,
  handleCellClick,
}) => {
  const isCellClickable = (index: number) => {
    const cellValue = board[index];
    return !cellValue && !winner && !isGameSeriesOver;
  };

  const getCellClassName = (index: number) => {
    const cellValue = board[index];
    return `
      w-20 h-20 border-2 border-gray-300 rounded-md
      flex items-center justify-center
      text-2xl font-bold
      transition-all duration-200
      ${isCellClickable(index) ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-not-allowed'}
      ${cellValue === PLAYER_X ? 'text-blue-600' : 'text-red-600'}
      ${(winner || isGameSeriesOver) && !cellValue ? 'opacity-50' : ''}
    `;
  };

  return (
    <div className='grid grid-cols-3 gap-2 p-4'>
      {[...Array(9)].map((_, index) => {
        const cellValue = board[index];
        return (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className={getCellClassName(index)}
            disabled={!!winner || !!cellValue || isGameSeriesOver}
          >
            {cellValue}
          </button>
        );
      })}
    </div>
  );
};

export default Game3x3Grid;
