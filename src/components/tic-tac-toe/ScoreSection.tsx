import { PLAYER_O, PLAYER_X } from '@/constants';
import { Player } from '@/types';
import React from 'react';

interface ScoreSectionProps {
  players: Player;
  scores: {
    player1: { roundWins: number; totalPoints: number };
    player2: { roundWins: number; totalPoints: number };
  };
  maxRounds: number;
  currentRound: number;
  currentPlayer: string;
}

const ScoreSection: React.FC<ScoreSectionProps> = ({
  players,
  scores,
  maxRounds,
  currentRound,
  currentPlayer,
}) => {
  const getPlayerClassName = (playerType: string) => {
    const isActive = currentPlayer === playerType;
    const baseClasses = 'text-center pb-2 rounded-lg transition-all';
    const activeClasses = isActive ? 'border-2 border-opacity-70 shadow-md' : '';

    if (playerType === PLAYER_X) {
      return `${baseClasses} ${activeClasses} ${isActive ? 'border-blue-500 bg-blue-50' : ''}`;
    } else if (playerType === PLAYER_O) {
      return `${baseClasses} ${activeClasses} ${isActive ? 'border-red-500 bg-red-50' : ''}`;
    }
    return baseClasses;
  };

  return (
    <div className='border border-gray-200 rounded-md bg-white mb-6'>
      <div className='p-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div className='text-left'>
            <h2 className='md:text-xl text-lg font-bold text-gray-800 '>
              Best of {maxRounds} Rounds
            </h2>
            <p className='text-sm text-gray-600'>
              To win a series, you need to win {Math.ceil(maxRounds / 2)} rounds
            </p>
          </div>
          <div className='text-center'>
            <div className='text-lg font-bold text-blue-600'>Round {currentRound}</div>
            <div className='text-sm text-gray-600'>{maxRounds - currentRound + 1} remaining</div>
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className='p-4'>
        <div className='grid grid-cols-3 gap-4 items-center'>
          {/* Player 1 Score */}
          <div className={getPlayerClassName(PLAYER_X)}>
            <div className='font-bold text-lg text-blue-600'>{players.player1} (X)</div>
            <div className='text-2xl font-bold'>{scores.player1.roundWins}</div>
            <div className='text-sm text-gray-600'>{scores.player1.totalPoints} pts</div>
          </div>

          {/* VS */}
          <div className='text-center'>
            <div className='text-gray-600 text-xl font-bold'>VS</div>
          </div>

          {/* Player 2 Score */}
          <div className={getPlayerClassName(PLAYER_O)}>
            <div className='font-bold text-lg text-red-600'>{players.player2} (O)</div>
            <div className='text-2xl font-bold'>{scores.player2.roundWins}</div>
            <div className='text-sm text-gray-600'>{scores.player2.totalPoints} pts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;
