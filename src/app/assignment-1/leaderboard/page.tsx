import LeaderBoard from '@/components/tic-tac-toe/LeaderBoard';
import React from 'react';
import { Trophy } from 'lucide-react';

const LeaderboardPage = () => {
  return (
    <div className='mt-10 bg-white rounded-lg p-4 max-w-4xl pb-20 mb-20'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Trophy className='w-6 h-6 text-blue-800' />
        <h1 className='text-2xl font-bold text-blue-800 text-center flex items-center justify-center gap-2'>
          Leaderboard
        </h1>
      </div>

      <LeaderBoard />
    </div>
  );
};

export default LeaderboardPage;
