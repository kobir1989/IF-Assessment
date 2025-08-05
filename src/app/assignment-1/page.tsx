import PlayerSetupForm from '@/components/tic-tac-toe/PlayerSetupForm';
import { UsersRound } from 'lucide-react';
import React from 'react';

const PlayerSetupPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-80px)]'>
      <div className='border border-blue-200 rounded-[20px] p-8 bg-white w-full md:w-[50%] flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 text-center'>
          <div className='flex flex-col items-center gap-2 justify-center'>
            <div className='bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4'>
              <UsersRound className='w-6 h-6 text-white' />
            </div>
            <h1 className='text-3xl text-blue-600 font-bold  gap-2 text-center'>Player Setup</h1>
          </div>
          <p className='text-sm text-gray-500'>
            Please enter the names of the players to start the game.
          </p>
        </div>
        <PlayerSetupForm />
      </div>
    </div>
  );
};

export default PlayerSetupPage;
