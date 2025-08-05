import { TIE } from '@/constants';
import { getCurrentPlayerName, getPlayerColorClass } from '@/utils';
import { Player } from '@/types';
import React from 'react';

interface GameStatusProps {
  isGameSeriesOver: boolean;
  winner: string | null;
  currentRound: number;
  currentPlayer: string;
  players: Player;
  getRoundWinnerName: () => string | null;
}

const GameStatus: React.FC<GameStatusProps> = ({
  isGameSeriesOver,
  winner,
  currentRound,
  currentPlayer,
  players,
  getRoundWinnerName,
}) => {
  const renderGameStatus = () => {
    if (isGameSeriesOver) {
      return <div className='text-lg text-gray-600'>Game series completed</div>;
    }

    if (winner) {
      return (
        <div className='text-xl font-bold'>
          {winner === TIE ? (
            <span className='text-gray-600'>Round {currentRound}: Tie!</span>
          ) : (
            <span className={getPlayerColorClass(winner!, currentPlayer)}>
              Round {currentRound}: {getRoundWinnerName()} wins!
            </span>
          )}
        </div>
      );
    }

    return (
      <div className='text-lg text-gray-700'>
        Round {currentRound} - Current turn:{' '}
        <span className={`font-bold ${getPlayerColorClass(currentPlayer, currentPlayer)}`}>
          {getCurrentPlayerName(currentPlayer, players)} ({currentPlayer})
        </span>
      </div>
    );
  };

  return <div className='text-center'>{renderGameStatus()}</div>;
};

export default GameStatus;
