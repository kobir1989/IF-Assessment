import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';
import { ROUTES } from '@/constants';

const EmptyLeaderBoard = () => {
  const router = useRouter();
  return (
    <div className='mt-20 flex flex-col items-center'>
      <p className='text-gray-500 text-center'>No leaderboard data available</p>
      <Button
        variant='gradient'
        className='mt-5'
        onClick={() => router.push(ROUTES.assignment_1.game.playerSetup)}
      >
        <Play className='w-4 h-4 mr-2' />
        Start Game
      </Button>
    </div>
  );
};

export default EmptyLeaderBoard;
