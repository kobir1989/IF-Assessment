import Input from '@/components/ui/Input';
import React from 'react';
import { UsersRound, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const PlayerSetupForm = () => {
  return (
    <div>
      <div className=''>
        <h1 className='text-2xl font-bold'>
          <span className='text-primary'>
            <UsersRound />
          </span>
          Player Setup
        </h1>
        <p className='text-sm text-gray-500'>
          Please enter the names of the players to start the game.
        </p>
      </div>
      <form className='flex flex-col gap-8 mt-8'>
        <div className='flex flex-col gap-4'>
          <Input label='Player 1' placeholder='Enter Player 1 name' />
          <Input label='Player 2' placeholder='Enter Player 2 name' />
        </div>
        <Button type='submit' className='w-full'>
          <Play />
          Start Game
        </Button>
      </form>
    </div>
  );
};

export default PlayerSetupForm;
