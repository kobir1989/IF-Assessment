import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modals.tsx';
import { Play, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ROUTES, TIE } from '@/constants';

interface SeriesWinnerModalProps {
  gameSeriesWinner: string | null;
  scores: { player1: { roundWins: number }; player2: { roundWins: number } };
  handleNewGameSeries: () => void;
  onClose: () => void;
}

const SeriesWinnerModal: React.FC<SeriesWinnerModalProps> = ({
  gameSeriesWinner,
  scores,
  handleNewGameSeries,
  onClose,
}) => {
  const router = useRouter();

  const handleViewLeaderboard = () => {
    onClose();
    router.push(ROUTES.assignment_1.game.leaderBoard);
  };

  return (
    <Modal title='Game Result' isShowSubmit={false} onClose={onClose}>
      <div className='border border-yellow-200 rounded-md bg-yellow-50 p-6 mb-6'>
        <div className='text-center'>
          <Trophy className='w-12 h-12 text-yellow-600 mx-auto mb-4' />
          <h2 className='text-2xl font-bold mb-2'>
            {gameSeriesWinner === TIE
              ? 'Game Series Tied!'
              : `${gameSeriesWinner} Wins the Series!`}
          </h2>
          <p className='text-gray-700 mb-4'>
            Final Score: {scores.player1.roundWins} - {scores.player2.roundWins}
          </p>
          <div className='flex gap-4 justify-center md:flex-row flex-col'>
            <Button variant='gradient' onClick={handleNewGameSeries}>
              <Play className='w-4 h-4' />
              New Game Series
            </Button>
            <Button variant='outline' onClick={handleViewLeaderboard}>
              <Trophy className='w-4 h-4' />
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SeriesWinnerModal;
