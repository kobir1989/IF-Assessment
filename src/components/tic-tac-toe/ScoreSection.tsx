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
}

const ScoreSection: React.FC<ScoreSectionProps> = ({
  players,
  scores,
  maxRounds,
  currentRound,
}) => {
  return (
    <div className='border border-gray-200 rounded-md bg-white mb-6'>
      <div className='p-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <div className='text-left'>
            <h2 className='md:text-xl text-lg font-bold text-gray-800 '>
              Best of {maxRounds} Rounds
            </h2>
            <p className='text-sm text-gray-600'>
              First to {Math.ceil(maxRounds / 2)} round wins is the champion
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
          <div className='text-center'>
            <div className='font-bold text-lg text-blue-600'>{players.player1}</div>
            <div className='text-2xl font-bold'>{scores.player1.roundWins}</div>
            <div className='text-sm text-gray-600'>{scores.player1.totalPoints} pts</div>
          </div>

          {/* VS */}
          <div className='text-center'>
            <div className='text-gray-600 text-xl font-bold'>VS</div>
          </div>

          {/* Player 2 Score */}
          <div className='text-center'>
            <div className='font-bold text-lg text-red-600'>{players.player2}</div>
            <div className='text-2xl font-bold'>{scores.player2.roundWins}</div>
            <div className='text-sm text-gray-600'>{scores.player2.totalPoints} pts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreSection;
