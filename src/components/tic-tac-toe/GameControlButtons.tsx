import { Button } from '@/components/ui/Button';
import { Play, RotateCcw } from 'lucide-react';
import React from 'react';

interface GameControlsProps {
  isGameSeriesOver: boolean;
  winner: string | null;
  currentRound: number;
  maxRounds: number;
  scores: { player1: { roundWins: number }; player2: { roundWins: number } };
  handleNextRound: () => void;
  handleResetGame: () => void;
  handleResetSeries: () => void;
}

const GameControlButtons: React.FC<GameControlsProps> = ({
  isGameSeriesOver,
  winner,
  currentRound,
  maxRounds,
  scores,
  handleNextRound,
  handleResetGame,
  handleResetSeries,
}) => {
  return (
    <div className='flex gap-2'>
      {!isGameSeriesOver && (
        <React.Fragment>
          {winner &&
          currentRound < maxRounds &&
          scores.player1.roundWins < 3 &&
          scores.player2.roundWins < 3 ? (
            <Button variant='gradient' onClick={handleNextRound}>
              <Play className='w-4 h-4' />
              Next Round
            </Button>
          ) : (
            <Button variant='gradient' onClick={handleResetGame} disabled={isGameSeriesOver}>
              <RotateCcw className='w-4 h-4' />
              Reset Round
            </Button>
          )}
          <Button variant='destructive' onClick={handleResetSeries} disabled={isGameSeriesOver}>
            <RotateCcw className='w-4 h-4' />
            Reset Series
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default GameControlButtons;
